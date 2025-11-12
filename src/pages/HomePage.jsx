// src/pages/HomePage.jsx
import React, { useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';
import PackageCard from '../components/Home/PackageCard';
import DocumentHead from '../components/Common/DocumentHead';

const HomePage = () => {
  const navigate = useNavigate();
  const packagesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.package-card-wrapper');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (packagesRef.current) {
      observer.observe(packagesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const packages = [
    {
      id: 1,
      name: "الباقة الأساسية",
      price: "٢٩٩ ريال",
      icon: "bi-rocket",
      features: [
        "تصميم شعار احترافي",
        "٣ مراجعات وتعديلات",
        "دليل استخدام الشعار",
        "تسليم خلال ٣ أيام عمل",
        "دعم فني لمدة أسبوع"
      ],
      description: "مثالية للشركات الناشئة والمشاريع الصغيرة"
    },
    {
      id: 2,
      name: "الباقة الاحترافية",
      price: "٥٩٩ ريال",
      icon: "bi-star",
      features: [
        "هوية بصرية متكاملة",
        "مراجعات غير محدودة",
        "حزمة وسائل تواصل اجتماعي",
        "تسليم خلال ٥ أيام عمل",
        "دعم فني لمدة شهر"
      ],
      description: "مناسبة للشركات المتوسطة والعلامات التجارية"
    },
    {
      id: 3,
      name: "باقة المؤسسات",
      price: "٩٩٩ ريال",
      icon: "bi-award",
      features: [
        "هوية بصرية شاملة",
        "تصميم موقع إلكتروني",
        "مواد تسويقية متكاملة",
        "تسليم خلال ٧ أيام عمل",
        "دعم فني لمدة ٣ أشهر",
        "إستشارات مجانية"
      ],
      description: "للمؤسسات الكبيرة والعلامات التجارية العالمية"
    }
  ];

  const handlePackageSelect = (packageId) => {
    navigate('/designers', { state: { selectedPackage: packageId } });
  };

  return (
    <div className="home-modern">
      <DocumentHead 
        title="Vivora Agency - وكالة التصميم الإبداعية"
        description="وكالة فيفورا للتصميم - نقدم حلول تصميم إبداعية شاملة تشمل الهويات البصرية، الشعارات، والمواقع الإلكترونية"
      />
      
      <HeroSection />

      {/* Packages Section */}
      <section id="packages" className="section-py packages-section" ref={packagesRef}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <div className="section-header animate-fade-in-up">
                <h2 className="section-title">باقاتنا المميزة</h2>
                <p className="section-subtitle">
                  اختر الباقة التي تناسب احتياجاتك وابدأ رحلتك نحو علامة تجارية متميزة
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="g-4">
            {packages.map((pkg, index) => (
              <Col key={pkg.id} lg={4} md={6}>
                <PackageCard 
                  package={pkg}
                  onSelect={() => handlePackageSelect(pkg.id)}
                  featured={index === 1}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="section-py features-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="features-content">
                <h2 className="section-title animate-fade-in-up">
                  لماذا تختار <span className="text-primary">فيفورا؟</span>
                </h2>
                <p className="section-subtitle animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  نتميز بتقديم حلول تصميمية إبداعية تجمع بين الجمال البصري 
                  والوظائف العملية لتحقيق أهدافك التجارية
                </p>
                
                <div className="features-list">
                  {[
                    { icon: 'bi-lightning', title: 'تسليم سريع', desc: 'نلتزم بمواعيد التسليم المتفق عليها' },
                    { icon: 'bi-gem', title: 'جودة عالية', desc: 'تصاميم احترافية تلبي أعلى المعايير' },
                    { icon: 'bi-headset', title: 'دعم متكامل', desc: 'فريق دعم فني متاح على مدار الساعة' },
                    { icon: 'bi-arrow-repeat', title: 'مراجعات غير محدودة', desc: 'حتى تحصل على التصميم المثالي' }
                  ].map((feature, index) => (
                    <div key={index} className="feature-item animate-fade-in-up" style={{animationDelay: `${0.4 + index * 0.1}s`}}>
                      <div className="feature-icon">
                        <i className={`bi ${feature.icon}`}></i>
                      </div>
                      <div className="feature-content">
                        <h5>{feature.title}</h5>
                        <p>{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="features-visual animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="visual-container">
                  <div className="main-circle">
                    <i className="bi bi-palette"></i>
                  </div>
                  <div className="orbit-circle orbit-1">
                    <i className="bi bi-brush"></i>
                  </div>
                  <div className="orbit-circle orbit-2">
                    <i className="bi bi-layers"></i>
                  </div>
                  <div className="orbit-circle orbit-3">
                    <i className="bi bi-magic"></i>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .home-modern {
          overflow-x: hidden;
        }

        .section-header {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--secondary);
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-light);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }

        .packages-section {
          background: var(--light-bg);
        }

        .features-section {
          background: white;
        }

        .features-content {
          padding-right: 2rem;
        }

        .features-list {
          margin-top: 2rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: var(--primary);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .feature-content h5 {
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--secondary);
        }

        .feature-content p {
          color: var(--text-light);
          margin: 0;
          line-height: 1.6;
        }

        .features-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .visual-container {
          position: relative;
          width: 400px;
          height: 400px;
        }

        .main-circle {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 2s ease-in-out infinite;
        }

        .orbit-circle {
          width: 80px;
          height: 80px;
          background: white;
          border: 2px solid var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          font-size: 1.5rem;
          position: absolute;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          animation: orbit 10s linear infinite;
        }

        .orbit-1 {
          animation-delay: 0s;
        }

        .orbit-2 {
          animation-delay: -3.33s;
        }

        .orbit-3 {
          animation-delay: -6.66s;
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .features-content {
            padding-right: 0;
            margin-bottom: 3rem;
          }

          .visual-container {
            width: 300px;
            height: 300px;
          }

          .main-circle {
            width: 150px;
            height: 150px;
            font-size: 2rem;
          }

          .orbit-circle {
            width: 60px;
            height: 60px;
            font-size: 1.2rem;
          }

          @keyframes orbit {
            0% {
              transform: rotate(0deg) translateX(120px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translateX(120px) rotate(-360deg);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;