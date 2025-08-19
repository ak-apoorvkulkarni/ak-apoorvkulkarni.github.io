import React, { useEffect, useState, useMemo } from 'react';
import './App.css';

function App() {
  const [typingText, setTypingText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openProjectModal = (projectId) => {
    setSelectedProject(projectId);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu clicked, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const roles = useMemo(() => [
    'an Electrical Engineer',
    'a Product Developer',
    'an Embedded Engineer'
  ], []);

  useEffect(() => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

        // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    return () => {
      navLinks.forEach(link => link.removeEventListener('click', () => {}));
      observer.disconnect();
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50; // Faster typing speed
    let timeoutId;

    const typeText = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        // Deleting text
        if (currentCharIndex > 0) {
          setTypingText(currentRole.substring(0, currentCharIndex - 1));
          currentCharIndex--;
          typingSpeed = 30; // Faster deletion
        } else {
          // Finished deleting, move to next role
          isDeleting = false;
          setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
          currentCharIndex = 0;
          typingSpeed = 500; // Pause before next role
        }
      } else {
        // Typing text
        if (currentCharIndex < currentRole.length) {
          setTypingText(currentRole.substring(0, currentCharIndex + 1));
          currentCharIndex++;
          typingSpeed = 50; // Faster typing
        } else {
          // Finished typing, wait 2 seconds then start deleting
          typingSpeed = 2000; // Wait 2 seconds
          isDeleting = true;
        }
      }

      timeoutId = setTimeout(typeText, typingSpeed);
    };

    // Start typing animation after a short delay
    const startTimeout = setTimeout(typeText, 1000);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentRoleIndex, roles]);

  // Improve skill tooltip behavior for mobile/touch and accessibility
  useEffect(() => {
    const skillItems = document.querySelectorAll('.skill-item[data-tooltip]');

    // Make items keyboard-focusable
    skillItems.forEach((el) => {
      if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
      }
    });

    const showTooltip = (el) => {
      el.classList.add('show-tooltip');
      if (el._tooltipTimer) clearTimeout(el._tooltipTimer);
      el._tooltipTimer = setTimeout(() => {
        el.classList.remove('show-tooltip');
      }, 1800);
    };

    const handleTouch = (e) => {
      showTooltip(e.currentTarget);
    };

    const handleKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showTooltip(e.currentTarget);
      }
    };

    skillItems.forEach((el) => {
      el.addEventListener('touchstart', handleTouch, { passive: true });
      el.addEventListener('click', handleTouch);
      el.addEventListener('keydown', handleKey);
    });

    return () => {
      skillItems.forEach((el) => {
        el.removeEventListener('touchstart', handleTouch);
        el.removeEventListener('click', handleTouch);
        el.removeEventListener('keydown', handleKey);
        if (el._tooltipTimer) clearTimeout(el._tooltipTimer);
      });
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="nav-brand">
            <div className="brand-logo">AK</div>
            <span className="brand-text">Apoorv Kulkarni</span>
          </div>
          <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#home" onClick={closeMobileMenu}>Home</a></li>
            <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
            <li><a href="#experience" onClick={closeMobileMenu}>Experience</a></li>
            <li><a href="#projects" onClick={closeMobileMenu}>Projects</a></li>
            <li><a href="#skills" onClick={closeMobileMenu}>Skills</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
          </ul>
          <div className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
        {/* Mobile menu backdrop */}
        <div 
          className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={closeMobileMenu}
        ></div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-background">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div>
            
            {/* Code Animations */}
            <div className="code-board">
              {/* Code Lines */}
              <div className="code-line code-1">const voltage = 3.3;</div>
              <div className="code-line code-2">if (sensor.read() &gt; threshold) &#123;</div>
              <div className="code-line code-3">  digitalWrite(LED, HIGH);</div>
              <div className="code-line code-4">&#125;</div>
              <div className="code-line code-5">void setup() &#123;</div>
              <div className="code-line code-6">  Serial.begin(9600);</div>
              <div className="code-line code-7">&#125;</div>
              <div className="code-line code-8">#define LED_PIN 13</div>
              <div className="code-line code-9">analogRead(A0);</div>
              <div className="code-line code-10">delay(100);</div>
            </div>
          </div>
          <div className="hero-content">
            <div className="profile-container">
              <img src="/images/profile.jpg" alt="Apoorv Kulkarni" className="profile-image" />
              <div className="profile-glow"></div>
            </div>
            <h1 className="hero-title">
              <span className="title-line">Hi, I'm</span>
              <span className="title-name">Apoorv Kulkarni</span>
            </h1>
            <p className="hero-subtitle">
              I'm{' '}
              <span className="typing-text">
                {typingText}
                <span className="typing-cursor">|</span>
              </span>
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                <span>View My Work</span>
                <div className="btn-glow"></div>
              </a>
              <a href="#contact" className="btn btn-secondary">
                <span>Get In Touch</span>
              </a>
            </div>
            <div className="scroll-indicator">
              <a href="#education" className="scroll-arrow-link">
                <div className="scroll-arrow"></div>
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  I am a graduate student at the Karlsruhe Institute of Technology with a solid background in 
                  embedded systems, PCB design, and applied electronics. My work focuses on building practical, 
                  hardware‑driven solutions that integrate both hardware and software effectively.
                </p>
                <p>
                  Currently, I am developing an ultra‑low voltage sensing and signal processing unit for 
                  thermoelectric sensors. This includes designing precision analog front‑end circuits, 
                  amplification and filtering systems, and digital readout interfaces optimized for microvolt‑level 
                  signals. The project aims to enable reliable, low‑power sensing for applications such as temperature 
                  and energy monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="education-section">
          <div className="container">
            <h2 className="section-title">Educational Journey</h2>
            <div className="education-showcase">
              <div className="education-card current">
                <div className="card-icon">
                  <div className="icon-bg">
                    <span className="icon">🎓</span>
                  </div>
                  <div className="timeline-dot"></div>
                </div>
                <div className="card-content">
                                        <div className="card-header">
                        <h3>Karlsruhe Institute of Technology</h3>
                      </div>
                  <p className="degree">Electrical Engineering and Information Technology</p>
                  <p className="location">📍 Karlsruhe, Germany</p>
                  <div className="timeline-info">
                    <span className="year">2022 - Present</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div className="card-highlights">
                    <span className="highlight">Research Focus</span>
                    <span className="highlight">Embedded Systems</span>
                    <span className="highlight">PCB Design</span>
                  </div>
                </div>
              </div>

              <div className="education-card">
                <div className="card-icon">
                  <div className="icon-bg">
                    <span className="icon">📊</span>
                  </div>
                  <div className="timeline-dot"></div>
                </div>
                <div className="card-content">
                                        <div className="card-header">
                        <h3>University of Duke CE</h3>
                      </div>
                  <p className="degree">Product Management Certification Program</p>
                  <p className="location">📍 Online Program</p>
                  <div className="timeline-info">
                    <span className="year">2022 - 2023</span>
                    <div className="progress-bar">
                      <div className="progress-fill completed" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  <div className="card-highlights">
                    <span className="highlight">Product Strategy</span>
                    <span className="highlight">User Research</span>
                    <span className="highlight">Agile Methods</span>
                  </div>
                </div>
              </div>

              <div className="education-card">
                <div className="card-icon">
                  <div className="icon-bg">
                    <span className="icon">⚡</span>
                  </div>
                  <div className="timeline-dot"></div>
                </div>
                <div className="card-content">
                                        <div className="card-header">
                        <h3>University of Mumbai</h3>
                      </div>
                  <p className="degree">Electronics Engineering</p>
                  <p className="location">📍 Mumbai, India</p>
                  <div className="timeline-info">
                    <span className="year">2016 - 2020</span>
                    <div className="progress-bar">
                      <div className="progress-fill completed" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  <div className="card-highlights">
                    <span className="highlight">Electronics</span>
                    <span className="highlight">Circuit Design</span>
                    <span className="highlight">Microcontrollers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <div className="container">
            <h2 className="section-title">Work Experience</h2>
            <div className="experience-grid">
              <div className="experience-card current">
                <div className="card-header">
                  <div className="role-icon">
                    <span className="icon">🔬</span>
                  </div>
                  <div className="role-info">
                    <h3>Research & Student Assistant</h3>
                    <p className="company">Karlsruhe Institute of Technology</p>
                    <span className="duration">08/2022 - Present</span>
                  </div>

                </div>
                <div className="card-body">
                  <div className="achievements">
                    <div className="achievement-item">
                      <span className="achievement-icon">⚡</span>
                      <p>Developing thermoelectric sensors using inkjet printing for temperature and energy sensing</p>
                    </div>
                    <div className="achievement-item">
                      <span className="achievement-icon">🔌</span>
                      <p>Designing analog front-end circuits for ultra-low voltage IR and heat flux signals</p>
                    </div>
                    <div className="achievement-item">
                      <span className="achievement-icon">🖥️</span>
                      <p>Created FPGA-based control logic for Atomic Force Microscopy</p>
                    </div>
                    <div className="achievement-item">
                      <span className="achievement-icon">🐍</span>
                      <p>Built Python GUI for CO2 laser alignment with real-time control and visualization</p>
                    </div>
                  </div>
                  <div className="tech-tags">
                    <span className="tech-tag">FPGA</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">Sensors</span>
                    <span className="tech-tag">PCB Design</span>
                  </div>
                </div>
              </div>

              <div className="experience-card">
                <div className="card-header">
                  <div className="role-icon">
                    <span className="icon">📊</span>
                  </div>
                  <div className="role-info">
                    <h3>Intern – Product Management</h3>
                    <p className="company">1&1 Mail & Media GmbH</p>
                    <span className="duration">10/2022 - 10/2024</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="achievements">
                    <div className="achievement-item">
                      <span className="achievement-icon">📈</span>
                      <p>Analyzed customer behavior, subscription patterns, and pricing data</p>
                    </div>
                    <div className="achievement-item">
                      <span className="achievement-icon">🛡️</span>
                      <p>Investigated fraud detection and optimized landing pages</p>
                    </div>
                    <div className="achievement-item">
                      <span className="achievement-icon">📚</span>
                      <p>Restructured help content to enhance user self-service</p>
                    </div>
                  </div>
                  <div className="tech-tags">
                    <span className="tech-tag">Data Analysis</span>
                    <span className="tech-tag">Product Strategy</span>
                    <span className="tech-tag">User Research</span>
                  </div>
                </div>
              </div>

              <div className="experience-card">
                <div className="card-header">
                  <div className="role-icon">
                    <span className="icon">🚀</span>
                  </div>
                  <div className="role-info">
                    <h3>Team Lead – Electronics</h3>
                    <p className="company">mu-zero HYPERLOOP e.V.</p>
                    <span className="duration">08/2022 - 09/2023</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="achievements">
                    <div className="achievement-item">
                      <span className="achievement-icon">👥</span>
                      <p>Led cross-functional teams to design, build, and test electronic systems</p>
                    </div>
                    <div className="achievement-item">
                      <span className="achievement-icon">🔧</span>
                      <p>Oversaw debugging, system integration, and test cases</p>
                    </div>
                    <div className="achievement-item">
                      <span className="achievement-icon">📦</span>
                      <p>Managed inventory and sourcing for the Hyperloop pod</p>
                    </div>
                  </div>
                  <div className="tech-tags">
                    <span className="tech-tag">Leadership</span>
                    <span className="tech-tag">System Integration</span>
                    <span className="tech-tag">Project Management</span>
                  </div>
                </div>
              </div>

              <div className="experience-card">
                <div className="card-header">
                  <div className="role-icon">
                    <span className="icon">🔍</span>
                  </div>
                  <div className="role-info">
                    <h3>Trainee – Quality Analyst</h3>
                    <p className="company">US Tech Solutions Pvt. Ltd</p>
                    <span className="duration">04/2021 - 08/2021</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="achievements">
                    <div className="achievement-item">
                      <span className="achievement-icon">✅</span>
                      <p>Performed data validation, QA testing, and client-side reporting for enterprise-level processes</p>
                    </div>
                    <div className="achievement-item">
                      <span className="achievement-icon">📋</span>
                      <p>Reviewed workflows to ensure compliance and quality standards</p>
                    </div>
                  </div>
                  <div className="tech-tags">
                    <span className="tech-tag">QA Testing</span>
                    <span className="tech-tag">Data Validation</span>
                    <span className="tech-tag">Compliance</span>
                  </div>
                </div>
              </div>

              <div className="experience-card">
                <div className="card-header">
                  <div className="role-icon">
                    <span className="icon">🧬</span>
                  </div>
                  <div className="role-info">
                    <h3>Research Assistant</h3>
                    <p className="company">Vidyalankar Institute of Technology, Mumbai</p>
                    <span className="duration">07/2019 - 03/2021</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="achievements">
                    <div className="achievement-item">
                      <span className="achievement-icon">💓</span>
                      <p>Conducted research on biosensor interfacing and biomedical signal processing for real-time health monitoring</p>
                    </div>
                    <div className="achievement-item">
                      <span className="achievement-icon">📡</span>
                      <p>Investigated signal acquisition and transmission methods to improve embedded system communication</p>
                    </div>
                  </div>
                  <div className="tech-tags">
                    <span className="tech-tag">Biosensors</span>
                    <span className="tech-tag">Signal Processing</span>
                    <span className="tech-tag">Embedded Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              {/* New: Precision Signal Conditioning & Acquisition System (first featured) */}
              <div className="project-card">
                <div className="project-content">
                  <h3>Precision Signal Conditioning & Acquisition System</h3>
                  <p>High-precision analog front-end and data acquisition pipeline for microvolt-level thermoelectric sensors, featuring low-noise amplification, filtering, high-resolution ADC, and real-time Python tooling.</p>
                  <div className="project-links">
                    <button onClick={() => openProjectModal('signal-conditioning')} className="btn btn-outline">View Details</button>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-content">
                  <h3>FPGA-Based Control for AFM</h3>
                  <p>Developed precision control system using Verilog on FPGA for nanoscale piezoelectric actuation in Atomic Force Microscopy with sub-nanometer positioning.</p>
                  <div className="project-links">
                    <button onClick={() => openProjectModal('fpga-afm')} className="btn btn-outline">View Details</button>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-content">
                  <h3>Smart Cloud-Based Heating System</h3>
                  <p>IoT-enabled solution for remote monitoring and control of smart heating systems using cloud analytics and mobile interfaces with Firebase backend.</p>
                  <div className="project-links">
                    <button onClick={() => openProjectModal('smart-heating')} className="btn btn-outline">View Details</button>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-content">
                  <h3>Assistive Glove for Speech-Impaired</h3>
                  <p>Wearable glove with embedded flex sensors to detect sign gestures and translate them into audible speech using text-to-speech modules.</p>
                  <div className="project-links">
                    <button onClick={() => openProjectModal('glove')} className="btn btn-outline">View Details</button>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-content">
                  <h3>Task-Specific Robots (ROBOCON)</h3>
                  <p>Designed and programmed two cooperative robots for India's ROBOCON competition with precise task coordination using PID control and RF communication.</p>
                  <div className="project-links">
                    <button onClick={() => openProjectModal('robocon')} className="btn btn-outline">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeProjectModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeProjectModal}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-body">
                {selectedProject === 'signal-conditioning' && (
                  <div className="project-details">
                    <h2>Precision Signal Conditioning & Acquisition System</h2>
                    <div className="project-tech-modal">
                      <span>Instrumentation Amplifier</span>
                      <span>Low-Noise AFE</span>
                      <span>Programmable Gain</span>
                      <span>Filtering</span>
                      <span>Impedance Matching</span>
                      <span>High-Res ADC</span>
                      <span>Python</span>
                      <span>USB DAQ</span>
                      <span>PCB Design</span>
                    </div>
                    <div className="project-description">
                      <h3>Project Overview</h3>
                      <p>Designed and implemented a high-precision analog front-end (AFE) to acquire and process ultra-low voltage signals generated by thermoelectric sensors. The design addresses the core challenges of microvolt-level acquisition including noise, offset, and thermal drift while preserving signal fidelity for downstream analysis.</p>

                      <h3>Key Features</h3>
                      <ul>
                        <li>Multi-stage instrumentation amplifier architecture with high CMRR and low input-referred noise.</li>
                        <li>Programmable gain via precision external resistors to adapt to varying sensor amplitudes.</li>
                        <li>Input and post-amplification filtering plus impedance matching for stable, wideband operation.</li>
                        <li>Integrated high-resolution ADC stage to digitize conditioned signals for analysis.</li>
                        <li>Real-time Python data acquisition over USB, live waveform plotting, and CSV logging with metadata.</li>
                      </ul>

                      <h3>Technical Implementation</h3>
                      <ul>
                        <li>Differential sensing front-end with careful layout for low leakage and minimal parasitic coupling.</li>
                        <li>Analog–digital isolation, star-grounding strategy, decoupling and ground plane optimization.</li>
                        <li>Thermal stability considerations in component selection and placement.</li>
                        <li>Impedance matching network and anti-alias filtering preceding the ADC.</li>
                      </ul>

                      <h3>Applications</h3>
                      <ul>
                        <li>Infrared heat flux measurement and thermal energy sensing.</li>
                        <li>Multi-channel thermal sensor arrays for environmental monitoring and wearable systems.</li>
                        <li>General-purpose scientific instrumentation requiring microvolt-level measurements.</li>
                      </ul>

                      <h3>Documentation & Deliverables</h3>
                      <ul>
                        <li>Complete schematics and PCB layout files with simulation notes.</li>
                        <li>Python acquisition scripts with instrument control, plotting, and structured CSV logging.</li>
                        <li>Assembly, calibration, and test procedure notes enabling reproducibility and scale-up.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {selectedProject === 'fpga-afm' && (
                  <div className="project-details">
                    <h2>FPGA-Based Control for AFM</h2>
                    <div className="project-tech-modal">
                      <span>FPGA</span>
                      <span>Verilog</span>
                      <span>AFM</span>
                      <span>Piezoelectric</span>
                      <span>Nanoscale</span>
                    </div>
                    <div className="project-description">
                      <h3>Project Overview</h3>
                      <p>Developed a precision control system for Atomic Force Microscopy (AFM) using Field Programmable Gate Arrays (FPGA) and Verilog hardware description language. The system provides sub-nanometer positioning accuracy for piezoelectric actuators.</p>
                      
                      <h3>Key Features</h3>
                      <ul>
                        <li>Sub-nanometer positioning accuracy</li>
                        <li>Real-time control using FPGA</li>
                        <li>Piezoelectric actuator control</li>
                        <li>Verilog-based digital design</li>
                        <li>High-frequency control signals</li>
                      </ul>
                      
                      <h3>Technical Implementation</h3>
                      <ul>
                        <li>FPGA-based control architecture</li>
                        <li>Verilog HDL for digital logic design</li>
                        <li>Precision timing control</li>
                        <li>Analog signal conditioning</li>
                        <li>Real-time feedback systems</li>
                      </ul>
                      
                      <h3>Results</h3>
                      <p>Achieved sub-nanometer positioning accuracy with real-time control capabilities, enabling precise manipulation of AFM probes for advanced microscopy applications.</p>
                    </div>
                  </div>
                )}
                
                {selectedProject === 'smart-heating' && (
                  <div className="project-details">
                    <h2>Smart Cloud-Based Heating System</h2>
                    <div className="project-tech-modal">
                      <span>IoT</span>
                      <span>ESP32</span>
                      <span>MQTT</span>
                      <span>Firebase</span>
                      <span>Cloud Analytics</span>
                    </div>
                    <div className="project-description">
                      <h3>Project Overview</h3>
                      <p>Developed an IoT-enabled smart heating system with cloud-based monitoring and control capabilities. The system provides remote access, real-time analytics, and intelligent temperature management.</p>
                      
                      <h3>Key Features</h3>
                      <ul>
                        <li>Remote monitoring and control</li>
                        <li>Cloud-based data analytics</li>
                        <li>Mobile app interface</li>
                        <li>Real-time temperature monitoring</li>
                        <li>Automated scheduling</li>
                      </ul>
                      
                      <h3>Technical Implementation</h3>
                      <ul>
                        <li>ESP32 microcontroller for IoT connectivity</li>
                        <li>MQTT protocol for real-time communication</li>
                        <li>Firebase backend for data storage</li>
                        <li>Mobile app for user interface</li>
                        <li>Cloud analytics for optimization</li>
                      </ul>
                      
                      <h3>Results</h3>
                      <p>Successfully implemented a complete IoT heating solution with 24/7 remote monitoring, reducing energy consumption by 25% through intelligent scheduling and analytics-driven optimization.</p>
                    </div>
                  </div>
                )}
                
                {selectedProject === 'glove' && (
                  <div className="project-details">
                    <h2>Assistive Glove for Speech-Impaired</h2>
                    <div className="project-tech-modal">
                      <span>Embedded</span>
                      <span>Sensors</span>
                      <span>TTS</span>
                      <span>Flex Sensors</span>
                      <span>Machine Learning</span>
                    </div>
                    <div className="project-description">
                      <h3>Project Overview</h3>
                      <p>Designed and developed a wearable assistive device that translates sign language gestures into audible speech. The system uses flex sensors to detect hand movements and converts them to speech through text-to-speech technology.</p>
                      
                      <h3>Key Features</h3>
                      <ul>
                        <li>Real-time gesture recognition</li>
                        <li>Text-to-speech conversion</li>
                        <li>Wearable design</li>
                        <li>Multiple sensor integration</li>
                        <li>Battery-powered operation</li>
                      </ul>
                      
                      <h3>Technical Implementation</h3>
                      <ul>
                        <li>Flex sensors for gesture detection</li>
                        <li>Microcontroller for signal processing</li>
                        <li>Text-to-speech module integration</li>
                        <li>Wireless communication</li>
                        <li>Machine learning for gesture recognition</li>
                      </ul>
                      
                      <h3>Results</h3>
                      <p>Created a functional prototype capable of recognizing 15+ basic sign language gestures with 85% accuracy, providing a communication bridge for speech-impaired individuals.</p>
                    </div>
                  </div>
                )}
                
                {selectedProject === 'robocon' && (
                  <div className="project-details">
                    <h2>Task-Specific Robots (ROBOCON)</h2>
                    <div className="project-tech-modal">
                      <span>Robotics</span>
                      <span>PID</span>
                      <span>RF</span>
                      <span>Cooperative Robots</span>
                      <span>Competition</span>
                    </div>
                    <div className="project-description">
                      <h3>Project Overview</h3>
                      <p>Designed and programmed two cooperative robots for India's prestigious ROBOCON competition. The robots work together to complete complex tasks with precise coordination and timing.</p>
                      
                      <h3>Key Features</h3>
                      <ul>
                        <li>Cooperative robot coordination</li>
                        <li>Precise task execution</li>
                        <li>PID control systems</li>
                        <li>RF communication between robots</li>
                        <li>Autonomous operation</li>
                      </ul>
                      
                      <h3>Technical Implementation</h3>
                      <ul>
                        <li>PID control algorithms for precision</li>
                        <li>RF communication protocols</li>
                        <li>Sensor fusion for navigation</li>
                        <li>Real-time task coordination</li>
                        <li>Robust mechanical design</li>
                      </ul>
                      
                      <h3>Results</h3>
                      <p>Successfully competed in ROBOCON with coordinated robots achieving 90% task completion accuracy, demonstrating advanced robotics and control system design capabilities.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <section id="skills" className="skills-section">
          <div className="container">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-showcase">
              <div className="skill-category-card">
                <div className="category-header">
                  <div className="category-icon">
                    <i className="fas fa-microchip"></i>
                  </div>
                  <h3>Embedded Systems</h3>
                </div>
                <div className="skills-grid">
                  <div className="skill-item" data-tooltip="Field Programmable Gate Arrays - Digital Design & Implementation">
                    <div className="skill-logo fpga">
                      <i className="fas fa-cogs"></i>
                    </div>
                    <span className="skill-name">FPGA</span>
                  </div>
                  <div className="skill-item" data-tooltip="Microcontroller Development & IoT Projects">
                    <div className="skill-logo arduino">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <span className="skill-name">Arduino</span>
                  </div>
                  <div className="skill-item" data-tooltip="ARM Cortex-M Development & Real-time Systems">
                    <div className="skill-logo stm32">
                      <i className="fas fa-microchip"></i>
                    </div>
                    <span className="skill-name">STM32</span>
                  </div>
                  <div className="skill-item" data-tooltip="WiFi & Bluetooth IoT Development">
                    <div className="skill-logo esp32">
                      <i className="fas fa-wifi"></i>
                    </div>
                    <span className="skill-name">ESP32</span>
                  </div>
                </div>
              </div>

              <div className="skill-category-card">
                <div className="category-header">
                  <div className="category-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3>Simulations & Analysis</h3>
                </div>
                <div className="skills-grid">
                  <div className="skill-item" data-tooltip="Numerical Computing & Signal Processing">
                    <div className="skill-logo matlab">
                      <i className="fas fa-chart-bar"></i>
                    </div>
                    <span className="skill-name">MATLAB</span>
                  </div>
                  <div className="skill-item" data-tooltip="Model-Based Design & Simulation">
                    <div className="skill-logo simulink">
                      <i className="fas fa-project-diagram"></i>
                    </div>
                    <span className="skill-name">Simulink</span>
                  </div>
                  <div className="skill-item" data-tooltip="Electronics Simulation">
                    <div className="skill-logo multisim">
                      <i className="fas fa-microchip"></i>
                    </div>
                    <span className="skill-name">Multisim</span>
                  </div>
                  <div className="skill-item" data-tooltip="Circuit Simulation & Analysis">
                    <div className="skill-logo ltspice">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <span className="skill-name">LTSpice</span>
                  </div>
                  <div className="skill-item" data-tooltip="PCB Design & Simulation">
                    <div className="skill-logo proteus">
                      <i className="fas fa-layer-group"></i>
                    </div>
                    <span className="skill-name">Proteus</span>
                  </div>
                </div>
              </div>

              <div className="skill-category-card">
                <div className="category-header">
                  <div className="category-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <h3>Languages & Frameworks</h3>
                </div>
                <div className="skills-grid">
                  <div className="skill-item" data-tooltip="Data Science, Automation & AI/ML">
                    <div className="skill-logo python">
                      <i className="fab fa-python"></i>
                    </div>
                    <span className="skill-name">Python</span>
                  </div>
                  <div className="skill-item" data-tooltip="Embedded Systems & System Programming">
                    <div className="skill-logo c">
                      <i className="fas fa-code"></i>
                    </div>
                    <span className="skill-name">C</span>
                  </div>
                  <div className="skill-item" data-tooltip="Shell Scripting & Automation">
                    <div className="skill-logo bash">
                      <i className="fas fa-terminal"></i>
                    </div>
                    <span className="skill-name">Bash</span>
                  </div>
                  <div className="skill-item" data-tooltip="Interactive Computing & Data Analysis">
                    <div className="skill-logo jupyter">
                      <i className="fas fa-book"></i>
                    </div>
                    <span className="skill-name">Jupyter</span>
                  </div>
                  <div className="skill-item" data-tooltip="Numerical Computing & Array Operations">
                    <div className="skill-logo numpy">
                      <i className="fas fa-calculator"></i>
                    </div>
                    <span className="skill-name">NumPy</span>
                  </div>
                  <div className="skill-item" data-tooltip="Data Manipulation & Analysis">
                    <div className="skill-logo pandas">
                      <i className="fas fa-table"></i>
                    </div>
                    <span className="skill-name">Pandas</span>
                  </div>
                  <div className="skill-item" data-tooltip="Scientific Computing">
                    <div className="skill-logo scipy">
                      <i className="fas fa-flask"></i>
                    </div>
                    <span className="skill-name">SciPy</span>
                  </div>
                  <div className="skill-item" data-tooltip="Data Visualization & Plotting">
                    <div className="skill-logo matplotlib">
                      <i className="fas fa-chart-pie"></i>
                    </div>
                    <span className="skill-name">Matplotlib</span>
                  </div>
                  <div className="skill-item" data-tooltip="GUI Development">
                    <div className="skill-logo tkinter">
                      <i className="fas fa-window-maximize"></i>
                    </div>
                    <span className="skill-name">Tkinter</span>
                  </div>
                  <div className="skill-item" data-tooltip="Advanced GUI Development">
                    <div className="skill-logo pyqt">
                      <i className="fas fa-desktop"></i>
                    </div>
                    <span className="skill-name">PyQt</span>
                  </div>
                  <div className="skill-item" data-tooltip="Instrument Control & Automation">
                    <div className="skill-logo pyvisa">
                      <i className="fas fa-cogs"></i>
                    </div>
                    <span className="skill-name">PyVISA</span>
                  </div>
                </div>
              </div>

              <div className="skill-category-card">
                <div className="category-header">
                  <div className="category-icon">
                    <i className="fas fa-tasks"></i>
                  </div>
                  <h3>Product & Project Management</h3>
                </div>
                <div className="skills-grid">
                  <div className="skill-item" data-tooltip="Product Strategy & Roadmap Planning">
                    <div className="skill-logo product-strategy">
                      <i className="fas fa-route"></i>
                    </div>
                    <span className="skill-name">Product Strategy</span>
                  </div>
                  <div className="skill-item" data-tooltip="Agile Development & Scrum">
                    <div className="skill-logo agile">
                      <i className="fas fa-sync-alt"></i>
                    </div>
                    <span className="skill-name">Agile</span>
                  </div>
                  <div className="skill-item" data-tooltip="User Research & UX Design">
                    <div className="skill-logo user-research">
                      <i className="fas fa-users"></i>
                    </div>
                    <span className="skill-name">User Research</span>
                  </div>
                  <div className="skill-item" data-tooltip="Project Management Tools">
                    <div className="skill-logo pmtools">
                      <i className="fas fa-tools"></i>
                    </div>
                    <span className="skill-name">PM Tools</span>
                  </div>
                </div>
              </div>

              <div className="skill-category-card">
                <div className="category-header">
                  <div className="category-icon">
                    <i className="fas fa-palette"></i>
                  </div>
                  <h3>Design Tools</h3>
                </div>
                <div className="skills-grid">
                  <div className="skill-item" data-tooltip="3D CAD Design & Engineering">
                    <div className="skill-logo fusion360">
                      <i className="fas fa-cube"></i>
                    </div>
                    <span className="skill-name">Fusion 360</span>
                  </div>
                  <div className="skill-item" data-tooltip="2D CAD Design & Drafting">
                    <div className="skill-logo autocad">
                      <i className="fas fa-drafting-compass"></i>
                    </div>
                    <span className="skill-name">AutoCAD</span>
                  </div>
                  <div className="skill-item" data-tooltip="PCB Design & Circuit Simulation">
                    <div className="skill-logo cadence">
                      <i className="fas fa-sitemap"></i>
                    </div>
                    <span className="skill-name">Cadence</span>
                  </div>
                  <div className="skill-item" data-tooltip="Optical System Design">
                    <div className="skill-logo optisystem">
                      <i className="fas fa-eye"></i>
                    </div>
                    <span className="skill-name">OptiSystem</span>
                  </div>
                </div>
              </div>

              <div className="skill-category-card">
                <div className="category-header">
                  <div className="category-icon">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <h3>PCB Tools</h3>
                </div>
                <div className="skills-grid">
                  <div className="skill-item" data-tooltip="PCB Layout & Schematic Design">
                    <div className="skill-logo eagle">
                      <i className="fas fa-project-diagram"></i>
                    </div>
                    <span className="skill-name">EAGLE</span>
                  </div>
                  <div className="skill-item" data-tooltip="Open Source PCB Design">
                    <div className="skill-logo kicad">
                      <i className="fas fa-layer-group"></i>
                    </div>
                    <span className="skill-name">KiCAD</span>
                  </div>
                  <div className="skill-item" data-tooltip="Professional PCB Design & Manufacturing">
                    <div className="skill-logo altium">
                      <i className="fas fa-layer-group"></i>
                    </div>
                    <span className="skill-name">Altium</span>
                  </div>
                </div>
              </div>

              <div className="skill-category-card">
                <div className="category-header">
                  <div className="category-icon">
                    <i className="fas fa-print"></i>
                  </div>
                  <h3>Sensor Fabrication</h3>
                </div>
                <div className="skills-grid">
                  <div className="skill-item" data-tooltip="Screen Printing Technology">
                    <div className="skill-logo screenprinting">
                      <i className="fas fa-print"></i>
                    </div>
                    <span className="skill-name">Screen Printing</span>
                  </div>
                  <div className="skill-item" data-tooltip="Inkjet Printing Technology">
                    <div className="skill-logo inkjet">
                      <i className="fas fa-print"></i>
                    </div>
                    <span className="skill-name">Inkjet Printing</span>
                  </div>
                  <div className="skill-item" data-tooltip="Printed Electronics Manufacturing">
                    <div className="skill-logo printed">
                      <i className="fas fa-microchip"></i>
                    </div>
                    <span className="skill-name">Printed Electronics</span>
                  </div>
                </div>
              </div>

              <div className="skill-category-card">
                <div className="category-header">
                  <div className="category-icon">
                    <i className="fas fa-tools"></i>
                  </div>
                  <h3>Other Tools</h3>
                </div>
                <div className="skills-grid">
                  <div className="skill-item" data-tooltip="Microsoft Office Suite">
                    <div className="skill-logo msoffice">
                      <i className="fas fa-file-word"></i>
                    </div>
                    <span className="skill-name">MS Office</span>
                  </div>
                  <div className="skill-item" data-tooltip="Version Control & Collaboration">
                    <div className="skill-logo git">
                      <i className="fab fa-git-alt"></i>
                    </div>
                    <span className="skill-name">Git</span>
                  </div>
                  <div className="skill-item" data-tooltip="Document Preparation & Typesetting">
                    <div className="skill-logo latex">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <span className="skill-name">LaTeX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="terminal-container">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="terminal-btn close"></span>
                  <span className="terminal-btn minimize"></span>
                  <span className="terminal-btn maximize"></span>
                </div>
                <div className="terminal-title">contact@apoorv:~$</div>
              </div>
              <div className="terminal-body">
                <div className="terminal-content">
                  <div className="command-line">
                    <span className="prompt">$</span>
                    <span className="command typing-text" data-text="whoami">whoami</span>
                  </div>
                  <div className="output-line">
                    <span className="output">Apoorv Kulkarni - Embedded Systems Engineer</span>
                  </div>
                  
                  <div className="command-line">
                    <span className="prompt">$</span>
                    <span className="command typing-text" data-text="cat contact.info">cat contact.info</span>
                  </div>
                  <div className="output-line">
                    <div className="contact-info-output">
                      <div className="info-row">
                        <span className="label">Email:</span>
                        <a href="mailto:apoorvkulkarni.ak@gmail.com" className="terminal-link">
                          apoorvkulkarni.ak@gmail.com
                        </a>
                      </div>
                      <div className="info-row">
                        <span className="label">Location:</span>
                        <span className="value">Germany</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Education:</span>
                        <span className="value">Karlsruhe Institute of Technology</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="command-line">
                    <span className="prompt">$</span>
                    <span className="command typing-text" data-text="ls social/">ls social/</span>
                  </div>
                  <div className="output-line">
                    <div className="social-links-output">
                      <div className="social-link-item">
                        <a href="https://linkedin.com/in/apoorvskulkarni" target="_blank" rel="noopener noreferrer" className="terminal-link">
                          <span className="link-icon">🔗</span>
                          <span className="link-text">linkedin</span>
                        </a>
                      </div>
                      <div className="social-link-item">
                        <a href="https://ak-apoorvkulkarni.github.io" target="_blank" rel="noopener noreferrer" className="terminal-link">
                          <span className="link-icon">🌐</span>
                          <span className="link-text">portfolio</span>
                        </a>
                      </div>
                      <div className="social-link-item">
                        <a href="https://scholar.google.com/citations?hl=en&user=7ff821IAAAAJ" target="_blank" rel="noopener noreferrer" className="terminal-link">
                          <span className="link-icon">📚</span>
                          <span className="link-text">google-scholar</span>
                        </a>
                      </div>
                      <div className="social-link-item">
                        <a href="https://github.com/ak-apoorvkulkarni" target="_blank" rel="noopener noreferrer" className="terminal-link">
                          <span className="link-icon">💻</span>
                          <span className="link-text">github</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="command-line">
                    <span className="prompt">$</span>
                    <span className="command typing-text" data-text="ping apoorv">ping apoorv</span>
                  </div>
                  <div className="output-line">
                    <div className="ping-output">
                      <span className="ping-line">PING apoorv (127.0.0.1) 56(84) bytes of data.</span>
                      <span className="ping-line">64 bytes from apoorv: icmp_seq=1 ttl=64 time=0.001 ms</span>
                      <span className="ping-line">64 bytes from apoorv: icmp_seq=2 ttl=64 time=0.002 ms</span>
                      <span className="ping-line">64 bytes from apoorv: icmp_seq=3 ttl=64 time=0.001 ms</span>
                      <span className="ping-line">--- apoorv ping statistics ---</span>
                      <span className="ping-line">3 packets transmitted, 3 received, 0% packet loss</span>
                      <span className="ping-line">Connection: <span className="status-online">ONLINE</span> ✅</span>
                    </div>
                  </div>
                  
                  <div className="command-line active">
                    <span className="prompt">$</span>
                    <span className="cursor">█</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <div className="container">
          <p>&copy; 2024 Apoorv Kulkarni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
