import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SimpleHome = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="fade-in">
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand">WholesaleFlow</Link>
          <div className="navbar-links">
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </div>
        </div>
      </nav>

      <div className="container" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>WholesaleFlow</h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto', marginBottom: '3rem' }}>
            Streamline your wholesale operations with our all-in-one management platform
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
            <Link to="/login" className="btn btn-primary btn-lg" style={{
              padding: '1rem 2.5rem',
              fontSize: '1.125rem',
              backgroundColor: 'var(--primary-color)',
              borderRadius: '0.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg" style={{
              padding: '1rem 2.5rem',
              fontSize: '1.125rem',
              borderRadius: '0.5rem',
              boxShadow: 'var(--shadow)'
            }}>
              Register
            </Link>
          </div>
        </div>

        {/* Key Features Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '4rem' }}>
          <div className="card">
            <div className="card-body">
              <div style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1rem' }}>
                <i className="fas fa-users"></i>
                👥
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Customer Segmentation</h2>
              <p style={{ color: 'var(--text-light)' }}>
                Categorize customers based on purchase history, location, industry, or other criteria to target them effectively.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div style={{ color: 'var(--success-color)', fontSize: '2rem', marginBottom: '1rem' }}>
                <i className="fas fa-user-tie"></i>
                👤
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Staff Management</h2>
              <p style={{ color: 'var(--text-light)' }}>
                Track staff activities, monitor performance, and manage clock-in/clock-out for better productivity.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div style={{ color: 'var(--warning-color)', fontSize: '2rem', marginBottom: '1rem' }}>
                <i className="fas fa-boxes"></i>
                📦
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Inventory Management</h2>
              <p style={{ color: 'var(--text-light)' }}>
                Keep track of your inventory in real-time, receive low stock alerts, and manage product categories.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Feature Showcase */}
        <div style={{
          padding: '4rem 0',
          marginBottom: '4rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="container">
            <h2 style={{
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--text-dark)'
            }}>
              Discover the Power of WholesaleFlow
            </h2>

            <p style={{
              textAlign: 'center',
              fontSize: '1.125rem',
              color: 'var(--text-medium)',
              maxWidth: '800px',
              margin: '0 auto 3rem auto',
              lineHeight: '1.7'
            }}>
              Our platform offers a seamless experience with powerful features designed specifically for wholesale businesses.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center'
            }}>
              {/* Left side: Feature tabs */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      fontSize: '1.25rem'
                    }}>
                      📊
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      margin: '0'
                    }}>
                      Real-time Analytics Dashboard
                    </h3>
                  </div>
                  <p style={{
                    margin: '0',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    Monitor your business metrics in real-time with live updates every 60 seconds. Track sales performance, inventory status, and team productivity with customizable KPI cards and interactive charts.
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#f0f9ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      fontSize: '1.25rem',
                      color: 'var(--primary-color)'
                    }}>
                      🔔
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      margin: '0',
                      color: 'var(--text-dark)'
                    }}>
                      Smart Inventory Alerts
                    </h3>
                  </div>
                  <p style={{
                    margin: '0 0 0 calc(40px + 1rem)',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    color: 'var(--text-light)'
                  }}>
                    Receive instant notifications when stock falls below custom thresholds. Our AI-powered system predicts inventory needs based on real-time sales data and automatically suggests optimal reorder quantities.
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#f0f9ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      fontSize: '1.25rem',
                      color: 'var(--primary-color)'
                    }}>
                      👥
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      margin: '0',
                      color: 'var(--text-dark)'
                    }}>
                      Customer Relationship Tools
                    </h3>
                  </div>
                  <p style={{
                    margin: '0 0 0 calc(40px + 1rem)',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    color: 'var(--text-light)'
                  }}>
                    Analyze customer behavior in real-time with our 360° customer view. Automatically segment customers based on purchase patterns and engage them with personalized communications that drive 35% higher retention.
                  </p>
                </div>
              </div>

              {/* Right side: AI Animation - Matching the provided image */}
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                backgroundColor: '#0a1929',
                border: '1px solid #1e293b',
                height: '450px',
                position: 'relative'
              }}>
                {/* AI Animation Background */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at center, #0f2744 0%, #0a1929 70%)',
                  opacity: 0.9,
                  zIndex: 1
                }}></div>

                {/* Grid Lines */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                  backgroundSize: '25px 25px',
                  zIndex: 2
                }}></div>

                <style>
                  {`
                    @keyframes pulse {
                      0% { transform: scale(1); opacity: 0.8; }
                      50% { transform: scale(1.05); opacity: 1; }
                      100% { transform: scale(1); opacity: 0.8; }
                    }

                    @keyframes float {
                      0% { transform: translateY(0px); }
                      50% { transform: translateY(-10px); }
                      100% { transform: translateY(0px); }
                    }

                    @keyframes orbit {
                      0% { transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); }
                      100% { transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); }
                    }

                    @keyframes blink {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0.3; }
                    }

                    @keyframes dataFlow {
                      0% { height: 0; opacity: 0; }
                      10% { opacity: 1; }
                      90% { opacity: 1; }
                      100% { height: 100px; opacity: 0; }
                    }
                  `}
                </style>

                {/* Central Logo */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.5) 60%, rgba(29, 78, 216, 0.2) 100%)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
                  zIndex: 3,
                  animation: 'pulse 3s ease-in-out infinite',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Minus Symbol */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '4px solid white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '30px',
                      height: '4px',
                      backgroundColor: 'white'
                    }}></div>
                  </div>
                </div>

                {/* Blue Data Points */}
                {[...Array(3)].map((_, index) => {
                  const angle = (index * 120) + Math.random() * 30;
                  const distance = 100 + (index * 20);
                  const size = 12 + (index * 4);
                  const delay = index * 2;
                  const duration = 15 + (index * 5);

                  const x = Math.cos(angle * (Math.PI / 180)) * distance;
                  const y = Math.sin(angle * (Math.PI / 180)) * distance;

                  return (
                    <div key={`blue-${index}`} style={{
                      position: 'absolute',
                      top: 'calc(50% + ' + y + 'px)',
                      left: 'calc(50% + ' + x + 'px)',
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      boxShadow: '0 0 15px #3b82f6',
                      zIndex: 4,
                      transform: 'translate(-50%, -50%)',
                      '--orbit-radius': `${distance}px`,
                      animation: `orbit ${duration}s linear infinite ${delay}s`
                    }}></div>
                  );
                })}

                {/* Green Data Points */}
                {[...Array(2)].map((_, index) => {
                  const angle = (index * 180) + 45 + Math.random() * 30;
                  const distance = 80 + (index * 30);
                  const size = 14 + (index * 2);
                  const delay = index * 1.5;
                  const duration = 20 + (index * 3);

                  const x = Math.cos(angle * (Math.PI / 180)) * distance;
                  const y = Math.sin(angle * (Math.PI / 180)) * distance;

                  return (
                    <div key={`green-${index}`} style={{
                      position: 'absolute',
                      top: 'calc(50% + ' + y + 'px)',
                      left: 'calc(50% + ' + x + 'px)',
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      boxShadow: '0 0 15px #10b981',
                      zIndex: 4,
                      transform: 'translate(-50%, -50%)',
                      '--orbit-radius': `${distance}px`,
                      animation: `orbit ${duration}s linear infinite ${delay}s`
                    }}></div>
                  );
                })}

                {/* Orange Data Points */}
                {[...Array(2)].map((_, index) => {
                  const angle = (index * 180) + 135 + Math.random() * 30;
                  const distance = 120 + (index * 20);
                  const size = 12 + (index * 2);
                  const delay = index * 1;
                  const duration = 25 + (index * 2);

                  const x = Math.cos(angle * (Math.PI / 180)) * distance;
                  const y = Math.sin(angle * (Math.PI / 180)) * distance;

                  return (
                    <div key={`orange-${index}`} style={{
                      position: 'absolute',
                      top: 'calc(50% + ' + y + 'px)',
                      left: 'calc(50% + ' + x + 'px)',
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: '50%',
                      backgroundColor: '#f59e0b',
                      boxShadow: '0 0 15px #f59e0b',
                      zIndex: 4,
                      transform: 'translate(-50%, -50%)',
                      '--orbit-radius': `${distance}px`,
                      animation: `orbit ${duration}s linear infinite ${delay}s`
                    }}></div>
                  );
                })}

                {/* Data Flow Lines */}
                {[...Array(6)].map((_, index) => {
                  const left = 10 + (index * 15);
                  const delay = index * 0.5;
                  const duration = 2 + Math.random() * 2;

                  return (
                    <div key={`line-${index}`} style={{
                      position: 'absolute',
                      top: '0',
                      left: `${left}%`,
                      width: '2px',
                      height: '0',
                      background: 'linear-gradient(to bottom, transparent, #3b82f6, transparent)',
                      zIndex: 3,
                      animation: `dataFlow ${duration}s linear infinite ${delay}s`
                    }}></div>
                  );
                })}

                {/* AI Text Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '0',
                  right: '0',
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.75rem',
                  zIndex: 5,
                  textShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
                }}>
                  AI-Powered Analytics
                </div>

                {/* Processing Status */}
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '0',
                  right: '0',
                  textAlign: 'center',
                  color: '#3b82f6',
                  fontSize: '0.8rem',
                  zIndex: 5,
                  animation: 'blink 1.5s infinite'
                }}>
                  Processing real-time data...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{
        padding: '5rem 0',
        marginBottom: '4rem',
        background: 'linear-gradient(to bottom, #ffffff, #f8fafc)',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(236, 242, 255, 0.7) 0%, rgba(236, 242, 255, 0) 50%), radial-gradient(circle at 80% 80%, rgba(236, 242, 255, 0.7) 0%, rgba(236, 242, 255, 0) 50%)',
          zIndex: '0'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: '1' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--text-dark)',
              position: 'relative',
              display: 'inline-block'
            }}>
              Customer Success Stories
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: 'var(--primary-color)',
                borderRadius: '2px'
              }}></div>
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--text-medium)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              See how businesses like yours are achieving remarkable results with WholesaleFlow
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            <div className="card" style={{
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)'
            }}>
              <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '8px', background: 'var(--primary-color)' }}></div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2.5rem' }}>
                <div style={{
                  fontSize: '1.5rem',
                  color: 'var(--warning-color)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div style={{
                  position: 'relative',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-15px',
                    fontSize: '3rem',
                    color: 'rgba(66, 153, 225, 0.15)',
                    fontFamily: 'Georgia, serif'
                  }}>"</div>
                  <p style={{
                    color: 'var(--text-medium)',
                    fontStyle: 'italic',
                    marginBottom: '0',
                    flex: '1',
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    WholesaleFlow has transformed how we manage our inventory. The real-time tracking and low stock alerts have saved us from countless stockouts. Our efficiency has improved by 40% in just three months!
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '1.5rem'
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #63b3ed, #4299e1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1.25rem',
                    fontSize: '1.75rem',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px -1px rgba(66, 153, 225, 0.3)'
                  }}>
                    SJ
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '700',
                      color: 'var(--text-dark)',
                      marginBottom: '0.25rem',
                      fontSize: '1.25rem'
                    }}>
                      Sarah Johnson
                    </p>
                    <p style={{
                      fontSize: '1rem',
                      color: 'var(--text-light)',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-color)',
                        marginRight: '8px'
                      }}></span>
                      Operations Manager, ABC Distributors
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)'
            }}>
              <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '8px', background: 'var(--success-color)' }}></div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2.5rem' }}>
                <div style={{
                  fontSize: '1.5rem',
                  color: 'var(--warning-color)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div style={{
                  position: 'relative',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-15px',
                    fontSize: '3rem',
                    color: 'rgba(72, 187, 120, 0.15)',
                    fontFamily: 'Georgia, serif'
                  }}>"</div>
                  <p style={{
                    color: 'var(--text-medium)',
                    fontStyle: 'italic',
                    marginBottom: '0',
                    flex: '1',
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    The customer segmentation feature has allowed us to target our marketing efforts more effectively. We've seen a 30% increase in repeat business and a 45% boost in customer retention since implementing WholesaleFlow.
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '1.5rem'
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #68d391, #48bb78)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1.25rem',
                    fontSize: '1.75rem',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px -1px rgba(72, 187, 120, 0.3)'
                  }}>
                    MC
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '700',
                      color: 'var(--text-dark)',
                      marginBottom: '0.25rem',
                      fontSize: '1.25rem'
                    }}>
                      Michael Chen
                    </p>
                    <p style={{
                      fontSize: '1rem',
                      color: 'var(--text-light)',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--success-color)',
                        marginRight: '8px'
                      }}></span>
                      CEO, XYZ Supplies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)'
            }}>
              <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '8px', background: 'var(--warning-color)' }}></div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2.5rem' }}>
                <div style={{
                  fontSize: '1.5rem',
                  color: 'var(--warning-color)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div style={{
                  position: 'relative',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-15px',
                    fontSize: '3rem',
                    color: 'rgba(237, 137, 54, 0.15)',
                    fontFamily: 'Georgia, serif'
                  }}>"</div>
                  <p style={{
                    color: 'var(--text-medium)',
                    fontStyle: 'italic',
                    marginBottom: '0',
                    flex: '1',
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    The staff management tools have improved our team's productivity by 25%. Being able to track performance metrics has been invaluable for our growth. We've reduced administrative overhead by 35% and improved team satisfaction.
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '1.5rem'
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f6ad55, #ed8936)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1.25rem',
                    fontSize: '1.75rem',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px -1px rgba(237, 137, 54, 0.3)'
                  }}>
                    ER
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '700',
                      color: 'var(--text-dark)',
                      marginBottom: '0.25rem',
                      fontSize: '1.25rem'
                    }}>
                      Emily Rodriguez
                    </p>
                    <p style={{
                      fontSize: '1rem',
                      color: 'var(--text-light)',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--warning-color)',
                        marginRight: '8px'
                      }}></span>
                      HR Director, Global Wholesale Inc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{
        background: '#f8fafc',
        padding: '4rem 0',
        marginBottom: '4rem',
        borderRadius: '8px'
      }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: 'var(--text-dark)'
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="card-body">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
                  How does WholesaleFlow help with inventory management?
                </h3>
                <p style={{ color: 'var(--text-medium)' }}>
                  WholesaleFlow provides real-time tracking of your inventory levels, automatic low stock alerts, and detailed reports on product movement. This helps you maintain optimal stock levels and avoid both stockouts and excess inventory.
                </p>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="card-body">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
                  Can I customize the platform to fit my business needs?
                </h3>
                <p style={{ color: 'var(--text-medium)' }}>
                  Yes! WholesaleFlow is highly customizable. You can configure product categories, customer segments, user roles, and reporting dashboards to match your specific business requirements.
                </p>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="card-body">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
                  Is my data secure with WholesaleFlow?
                </h3>
                <p style={{ color: 'var(--text-medium)' }}>
                  Absolutely. We implement industry-leading security measures including end-to-end encryption, regular security audits, and strict access controls. Your business data is always protected.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
                  Do you offer customer support?
                </h3>
                <p style={{ color: 'var(--text-medium)' }}>
                  We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated support team is always ready to assist you with any questions or issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-5" style={{
        padding: '3rem',
        background: 'linear-gradient(135deg, var(--primary-color), #4299e1)',
        color: 'white',
        boxShadow: 'var(--shadow-lg)',
        borderRadius: '8px'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '1.125rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto', marginBottom: '1.5rem' }}>
            Join our platform today and take your wholesale business to the next level.
          </p>

          <Link to="/register" className="btn btn-lg" style={{
            backgroundColor: 'white',
            color: 'var(--primary-color)',
            padding: '0.75rem 2rem',
            fontWeight: '600',
            borderRadius: '0.5rem'
          }}>
            Sign Up Now
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SimpleHome;
