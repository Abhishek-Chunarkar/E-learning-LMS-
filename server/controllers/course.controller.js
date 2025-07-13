import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";
import {deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia} from "../utils/cloudinary.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";

export const createCourse = async (req,res) => {
    try {
        const {courseTitle, category} = req.body;
        if(!courseTitle || !category) {
            return res.status(400).json({
                message:"Course title and category is required."
            })
        }
        
        // Determine if this is an admin request based on the route
        const isAdmin = req.originalUrl.includes('/admin/');
        
        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id,
            creatorType: isAdmin ? 'Admin' : 'User'
        });

        return res.status(201).json({
            course,
            message:"Course created."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create course"
        })
    }
}

export const searchCourse = async (req,res) => {
    try {
        const {query = "", categories = [], sortByPrice =""} = req.query;
        console.log(categories);
        
        // create search query
        const searchCriteria = {
            isPublished:true,
            $or:[
                {courseTitle: {$regex:query, $options:"i"}},
                {subTitle: {$regex:query, $options:"i"}},
                {category: {$regex:query, $options:"i"}},
            ]
        }

        // if categories selected
        if(categories.length > 0) {
            searchCriteria.category = {$in: categories};
        }

        // define sorting order
        const sortOptions = {};
        if(sortByPrice === "low"){
            sortOptions.coursePrice = 1;//sort by price in ascending
        }else if(sortByPrice === "high"){
            sortOptions.coursePrice = -1; // descending
        }

        // First get courses without populating
        let courses = await Course.find(searchCriteria).sort(sortOptions);
        
        // Process each course to find the creator
        const processedCourses = await Promise.all(courses.map(async (course) => {
            const courseObj = course.toObject();
            if (courseObj.creator) {
                // Try to find creator in User collection
                let creator = await User.findById(courseObj.creator).select("name photoUrl");
                
                // If not found, try Admin collection
                if (!creator) {
                    creator = await Admin.findById(courseObj.creator).select("name photoUrl");
                }
                
                if (creator) {
                    courseObj.creator = creator;
                }
            }
            return courseObj;
        }));

        return res.status(200).json({
            success:true,
            courses: processedCourses || []
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to search courses" });
    }
}

export const getPublishedCourse = async (_,res) => {
    try {
        // First get courses without populating
        const courses = await Course.find({isPublished:true});
        
        if(!courses || courses.length === 0){
            return res.status(404).json({
                message:"Course not found"
            })
        }
        
        // Process each course to find the creator and purchase count
        const processedCourses = await Promise.all(courses.map(async (course) => {
            const courseObj = course.toObject();
            
            // Find creator info
            if (courseObj.creator) {
                // Try to find creator in User collection
                let creator = await User.findById(courseObj.creator).select("name photoUrl");
                
                // If not found, try Admin collection
                if (!creator) {
                    creator = await Admin.findById(courseObj.creator).select("name photoUrl");
                }
                
                if (creator) {
                    courseObj.creator = creator;
                }
            }
            
            // Get purchase count from CoursePurchase collection
            const purchaseCount = await CoursePurchase.countDocuments({
                courseId: course._id,
                status: "completed"
            });
            
            // Add purchase count to course object
            courseObj.purchaseCount = purchaseCount;
            
            return courseObj;
        }));

        return res.status(200).json({
            courses: processedCourses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to get published courses"
        })
    }
}
export const getCreatorCourses = async (req,res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({creator:userId});
        if(!courses){
            return res.status(404).json({
                courses:[],
                message:"Course not found"
            })
        };
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create course"
        })
    }
}
export const editCourse = async (req,res) => {
    try {
        const courseId = req.params.courseId;
        const {courseTitle, subTitle, description, category, courseLevel, coursePrice} = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:"Course not found!"
            })
        }
        let courseThumbnail;
        if(thumbnail){
            if(course.courseThumbnail){
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId); // delete old image
            }
            // upload a thumbnail on clourdinary
            courseThumbnail = await uploadMedia(thumbnail.path);
        }

 
        const updateData = {courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail:courseThumbnail?.secure_url};

        course = await Course.findByIdAndUpdate(courseId, updateData, {new:true});

        return res.status(200).json({
            course,
            message:"Course updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create course"
        })
    }
}
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    
    // Try to find creator in User collection first
    if (course.creator) {
      let creator = await User.findById(course.creator).select("name photoUrl");
      
      // If not found in User collection, try Admin collection
      if (!creator) {
        creator = await Admin.findById(course.creator).select("name photoUrl");
      }
      
      // Replace the creator ID with the actual user/admin object
      if (creator) {
        course.creator = creator;
      }
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course by id",
    });
  }
};


export const createLecture = async (req,res) => {
    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;

        if(!lectureTitle || !courseId){
            return res.status(400).json({
                message:"Lecture title is required"
            })
        };

        // create lecture
        const lecture = await Lecture.create({lectureTitle});

        const course = await Course.findById(courseId);
        if(course){
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(201).json({
            lecture,
            message:"Lecture created successfully."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create lecture"
        })
    }
}

export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }
        return res.status(200).json({
            lectures: course.lectures
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to get lectures"
        })
    }
}

export const editLecture = async (req, res) => {
  try {  
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo) lecture.videoInfo = videoInfo; // should be { videoUrl }
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit lectures",
    });
  }
};


export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }


    // Remove from course lectures list
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({
      message: "Lecture removed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

export const getLectureById = async (req,res) => {
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found!"
            });
        }
        return res.status(200).json({
            lecture
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to get lecture by id"
        })
    }
}


// publich unpublish course logic

export const togglePublishCourse = async (req,res) => {
    try {
        const {courseId} = req.params;
        const {publish} = req.query; // true, false
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:"Course not found!"
            });
        }
        // publish status based on the query paramter
        course.isPublished = publish === "true";
        await course.save();

        const statusMessage = course.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            message:`Course is ${statusMessage}`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to update status"
        })
    }
}

// Remove course and its associated lectures
export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        
        // Find the course first to check if it exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found!"
            });
        }
        
        // Delete all lectures associated with the course
        if (course.lectures && course.lectures.length > 0) {
            await Lecture.deleteMany({ _id: { $in: course.lectures } });
        }
        
        // Delete course thumbnail from cloudinary if it exists
        if (course.courseThumbnail) {
            const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
            await deleteMediaFromCloudinary(publicId);
        }
        
        // Finally delete the course itself
        await Course.findByIdAndDelete(courseId);
        
        return res.status(200).json({
            message: "Course and associated lectures deleted successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to delete course"
        });
    }
}
