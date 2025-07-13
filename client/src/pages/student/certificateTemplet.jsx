import { useRef } from "react";
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from "sonner";

const CertificateTemplate = ({ 
  courseTitle, 
  studentName, 
  courseId, 
  lecturesCount, 
  instructorName, 
  completed
}) => {
  const certificateRef = useRef(null);
  const certificateId = `LMS-${courseId.slice(-6).toUpperCase()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  // Get current date for certificate
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  
  // Generate certificate as PDF
  const generateCertificate = async () => {
    if (!completed) {
      toast.error("Please complete the course first");
      return;
    }
    
    try {
      const certificateElement = certificateRef.current;
      
      // Make certificate visible during generation
      certificateElement.style.display = 'block';
      
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`);
      
      // Hide certificate element after generation
      certificateElement.style.display = 'none';
      
      toast.success('Certificate generated successfully!');
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast.error('Failed to generate certificate');
    }
  };

  return (
    <>
      {/* The certificate generation button */}
      {completed && (
        <button 
          onClick={generateCertificate} 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          Generate Certificate
        </button>
      )}
      
      {/* Hidden Certificate Template - will be used to generate PDF */}
      <div 
        ref={certificateRef} 
        className="hidden"
      >
        <div 
          style={{ 
            width: '1122px',
            height: '793px',
            padding: '50px',
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
            border: '20px solid #1a202c',
            boxSizing: 'border-box',
            position: 'relative',
            fontFamily: 'Georgia, serif'
          }}
        >
          {/* Outer Border */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            right: '10px',
            bottom: '10px',
            border: '2px solid #2d3748',
            borderRadius: '12px',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          {/* Header / Logo */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '50px',
            fontSize: '24px',
            fontWeight: '700',
            color: '#2c5282',
            fontFamily: 'Arial, sans-serif'
          }}>
            LMS ACADEMY
          </div>

          {/* Main Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '48px',
              color: '#1a202c',
              fontWeight: 'bold',
              letterSpacing: '2px',
              marginBottom: '20px'
            }}>
              Certificate of Completion
            </h1>

            <p style={{ fontSize: '18px', color: '#4a5568' }}>This is to proudly certify that</p>

            <h2 style={{
              fontSize: '36px',
              margin: '20px 0',
              color: '#2b6cb0',
              fontFamily: 'Brush Script MT, cursive'
            }}>
              {studentName || "Student Name"}
            </h2>

            <p style={{ fontSize: '18px', color: '#4a5568' }}>has successfully completed the course</p>

            <h3 style={{
              fontSize: '28px',
              color: '#1a202c',
              fontStyle: 'italic',
              margin: '10px 0'
            }}>
              &ldquo;{courseTitle}&rdquo;
            </h3>

            <p style={{ fontSize: '16px', color: '#4a5568', marginBottom: '8px' }}>
              offered by LMS Academy on {getCurrentDate()}
            </p>

            <p style={{
              fontSize: '16px',
              color: '#4a5568',
              margin: '20px 0 30px',
              maxWidth: '70%'
            }}>
              in recognition of outstanding performance and dedication in completing all modules and assessments.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '80%',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              <div style={{ textAlign: 'left' }}>
                <p><strong>Duration:</strong> {lecturesCount || 0} Lectures</p>
                <p><strong>Instructor:</strong> {instructorName || "Course Instructor"}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p><strong>Certificate ID:</strong> {certificateId}</p>
                <p><strong>Issued:</strong> {getCurrentDate()}</p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '80%',
              marginTop: '40px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{ width: '200px', borderTop: '2px solid #1a202c' }}></div>
                <div style={{ fontSize: '14px', marginTop: '8px', fontWeight: '600' }}>Authorized Instructor</div>
                <div style={{ fontSize: '13px', color: '#4a5568' }}>{instructorName || "Course Instructor"}</div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{ width: '200px', borderTop: '2px solid #1a202c' }}></div>
                <div style={{ fontSize: '14px', marginTop: '8px', fontWeight: '600' }}>Platform Director</div>
                <div style={{ fontSize: '13px', color: '#4a5568' }}>LMS Academy</div>
              </div>
            </div>

            {/* Verification footer */}
            <div style={{
              position: 'absolute',
              bottom: '25px',
              right: '50px',
              fontSize: '12px',
              color: '#718096',
              fontStyle: 'italic'
            }}>
              Verify this certificate at: lms-academy.com/verify
            </div>

            {/* Watermark Seal */}
            <div style={{
              position: 'absolute',
              bottom: '90px',
              right: '90px',
              width: '100px',
              height: '100px',
              border: '2px solid #2c5282',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.4,
              transform: 'rotate(-10deg)'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#2c5282'
              }}>
                LMS
                <br />SEAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CertificateTemplate.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  studentName: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  lecturesCount: PropTypes.number.isRequired,
  instructorName: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};

export default CertificateTemplate;
