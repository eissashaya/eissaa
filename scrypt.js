 document.addEventListener('DOMContentLoaded', function() {
            // ✅ تهيئة السنة الحالية في الفوتر
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            
            // ✅ تفعيل الوضع الليلي تلقائياً في المساء
            const hour = new Date().getHours();
            if (hour >= 18 || hour < 6) {
                document.body.classList.add('night-mode');
                document.querySelector('#nightModeBtn i').className = 'fas fa-sun';
            }
            
            // ✅ زر الوضع الليلي
            document.getElementById('nightModeBtn').addEventListener('click', function() {
                document.body.classList.toggle('night-mode');
                const icon = this.querySelector('i');
                icon.className = document.body.classList.contains('night-mode') ? 'fas fa-sun' : 'fas fa-moon';
                showToast(document.body.classList.contains('night-mode') ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري');
            });
            
            // ✅ قائمة الجوال المحسنة
            const menuToggle = document.getElementById('menuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
            const mobileCloseBtn = document.getElementById('mobileCloseBtn');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            
            function openMobileMenu() {
                mobileMenu.classList.add('active');
                mobileMenuOverlay.classList.add('active');
                document.body.classList.add('menu-open');
                menuToggle.style.opacity = '0';
            }
            
            function closeMobileMenu() {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.style.opacity = '1';
            }
            
            menuToggle.addEventListener('click', openMobileMenu);
            mobileCloseBtn.addEventListener('click', closeMobileMenu);
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
            
            // إغلاق القائمة عند النقر على رابط
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetSection = this.getAttribute('data-section');
                    const targetElement = document.getElementById(targetSection);
                    
                    closeMobileMenu();
                    
                    // الانتقال إلى القسم المطلوب
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                    
                    // تحديث الرابط النشط
                    mobileNavLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // تحديث الرابط النشط أثناء التمرير
            window.addEventListener('scroll', function() {
                const sections = ['home', 'about', 'services', 'apps', 'contact'];
                const scrollPosition = window.scrollY + 100;
                
                sections.forEach(section => {
                    const element = document.getElementById(section);
                    if (element) {
                        const offsetTop = element.offsetTop;
                        const offsetHeight = element.offsetHeight;
                        
                        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                            mobileNavLinks.forEach(link => link.classList.remove('active'));
                            const activeLink = document.querySelector(`.mobile-nav-link[data-section="${section}"]`);
                            if (activeLink) activeLink.classList.add('active');
                        }
                    }
                });
            });
            
            // ✅ البحث عن الدورات
            const searchBar = document.getElementById('searchBar');
            if (searchBar) {
                searchBar.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase().trim();
                    const serviceCards = document.querySelectorAll('.service-card');
                    
                    serviceCards.forEach(card => {
                        const title = card.querySelector('h3 a').textContent.toLowerCase();
                        const description = card.querySelector('p').textContent.toLowerCase();
                        
                        if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            }
            
            // (زر نسخ رقم الواتساب أُزيل من الواجهة)
            
            // ✅ تأثيرات التمرير
            const fadeElements = document.querySelectorAll('.fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            
            fadeElements.forEach(el => observer.observe(el));
            
            // ✅ زر العودة للأعلى
            const scrollTopBtn = document.getElementById('scrollTopBtn');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('active');
                } else {
                    scrollTopBtn.classList.remove('active');
                }
                
                // إضافة تأثير التمرير للعناصر
                fadeElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 100) {
                        el.classList.add('visible');
                    }
                });
            });
            
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            // ✅ إرسال نموذج الاتصال
            const contactForm = document.getElementById('contactForm');
            const contactMsg = document.getElementById('contactMsg');
            
            if (contactForm) {
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    
                    // تعطيل الزر وإظهار التحميل
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'جاري الإرسال...';
                    
                    // جمع بيانات النموذج
                    const formData = new FormData(this);
                    
                    try {
                        const response = await fetch(this.action, {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            contactMsg.textContent = '✅ تم إرسال رسالتك بنجاح! سأرد عليك في أقرب وقت.';
                            contactMsg.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
                            contactMsg.style.color = '#28a745';
                            contactMsg.style.display = 'block';
                            contactForm.reset();
                        } else {
                            throw new Error('فشل الإرسال');
                        }
                    } catch (error) {
                        contactMsg.textContent = '❌ حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.';
                        contactMsg.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
                        contactMsg.style.color = '#dc3545';
                        contactMsg.style.display = 'block';
                    } finally {
                        // إعادة تفعيل الزر
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        
                        // إخفاء الرسالة بعد 5 ثوانٍ
                        setTimeout(() => {
                            contactMsg.style.display = 'none';
                        }, 5000);
                    }
                });
            }
            
            // ✅ وظيفة عرض الإشعارات
            window.showToast = function(message) {
                const toast = document.getElementById('toast');
                toast.textContent = message;
                toast.classList.add('active');
                
                setTimeout(() => {
                    toast.classList.remove('active');
                }, 3000);
            };
            
            // ✅ تأثير خاص لصورة التطبيق
            const appScreenshot = document.querySelector('.app-screenshot');
            if (appScreenshot) {
                appScreenshot.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.03) rotate(2deg)';
                });
                
                appScreenshot.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0deg)';
                });
            }
            
            // ✅ إغلاق القائمة بالزر ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeMobileMenu();
                }
            });
        });


        
        document.addEventListener('DOMContentLoaded', function() {
            const mainCard = document.getElementById('mainCard');
            const showDetailsBtn = document.getElementById('showDetailsBtn');
            const modalOverlay = document.getElementById('modalOverlay');
            const closeModal = document.getElementById('closeModal');
            
            // فتح النافذة عند النقر على البطاقة أو الزر
            mainCard.addEventListener('click', function(e) {
                if (!e.target.closest('.show-details-btn')) return;
                modalOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
            });
            
            // إغلاق النافذة عند النقر على زر الإغلاق
            closeModal.addEventListener('click', function() {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // إغلاق النافذة عند النقر خارج المحتوى
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    modalOverlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // إغلاق النافذة باستخدام مفتاح Esc
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
                    modalOverlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // تفعيل تأثيرات التمرير داخل النافذة
            const featureItems = document.querySelectorAll('.feature-item');
            featureItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(5px)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
            
          
          
        });