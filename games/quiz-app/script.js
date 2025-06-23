// Modern Quiz Application - "Hỏi Đáp Vui - Khám Phá Thế Giới Cùng Bé"
class QuizApp {
    constructor() {
        this.questions = [
            // Khoa học tự nhiên
            {
                question: "Vì sao bầu trời có màu xanh?",
                answers: {
                    A: "Vì không khí có màu xanh",
                    B: "Vì ánh sáng xanh phản xạ nhiều nhất",
                    C: "Vì biển phản chiếu lên trời",
                    D: "Vì mặt trời có màu xanh"
                },
                correct: "B",
                explanation: "Ánh sáng xanh có bước sóng ngắn nên bị tán xạ nhiều hơn trong khí quyển!"
            },
            {
                question: "Vì sao lá cây có màu xanh?",
                answers: {
                    A: "Vì có chất diệp lục",
                    B: "Vì hút nước từ đất",
                    C: "Vì được tưới nước",
                    D: "Vì sống trong không khí"
                },
                correct: "A",
                explanation: "Diệp lục giúp cây hấp thụ ánh sáng để quang hợp và có màu xanh!"
            },
            {
                question: "Vì sao ban đêm trời tối?",
                answers: {
                    A: "Vì mặt trời ngủ",
                    B: "Vì trái đất quay",
                    C: "Vì mây che khuất",
                    D: "Vì mặt trời tắt"
                },
                correct: "B",
                explanation: "Trái đất quay quanh trục nên có lúc quay mặt khỏi mặt trời!"
            },
            {
                question: "Vì sao cầu vồng có nhiều màu?",
                answers: {
                    A: "Vì mưa có nhiều màu",
                    B: "Vì ánh sáng bị khúc xạ",
                    C: "Vì mây có nhiều màu",
                    D: "Vì nước có nhiều màu"
                },
                correct: "B",
                explanation: "Ánh sáng trắng bị phân tách thành nhiều màu khi đi qua giọt nước!"
            },
            {
                question: "Vì sao chúng ta phải thở?",
                answers: {
                    A: "Để làm mát cơ thể",
                    B: "Để lấy oxy cho cơ thể",
                    C: "Để tạo ra tiếng nói",
                    D: "Để làm sạch phổi"
                },
                correct: "B",
                explanation: "Cơ thể cần oxy để sống và thải ra khí carbon dioxide!"
            },
            
            // Thiên nhiên
            {
                question: "Vì sao nước biển mặn?",
                answers: {
                    A: "Vì có muối hòa tan",
                    B: "Vì cá thải ra",
                    C: "Vì mưa mặn",
                    D: "Vì đất biển mặn"
                },
                correct: "A",
                explanation: "Nước biển chứa nhiều muối khoáng từ đất đá bị rửa trôi!"
            },
            {
                question: "Vì sao tuyết có màu trắng?",
                answers: {
                    A: "Vì làm từ sữa",
                    B: "Vì phản xạ tất cả ánh sáng",
                    C: "Vì lạnh nên trắng",
                    D: "Vì có màu tự nhiên"
                },
                correct: "B",
                explanation: "Tuyết phản xạ tất cả màu ánh sáng nên ta thấy màu trắng!"
            },
            {
                question: "Vì sao núi lửa phun trào?",
                answers: {
                    A: "Vì núi tức giận",
                    B: "Vì magma nóng dâng lên",
                    C: "Vì có người đào",
                    D: "Vì động đất"
                },
                correct: "B",
                explanation: "Magma nóng chảy từ lòng đất dâng lên và phun ra ngoài!"
            },
            
            // Cơ thể con người
            {
                question: "Vì sao chúng ta có vân tay?",
                answers: {
                    A: "Để làm đẹp tay",
                    B: "Để cầm nắm tốt hơn",
                    C: "Để nhận diện",
                    D: "Để bảo vệ tay"
                },
                correct: "B",
                explanation: "Vân tay giúp tăng ma sát để cầm nắm đồ vật chắc chắn hơn!"
            },
            {
                question: "Vì sao con người cần ngủ?",
                answers: {
                    A: "Để tránh ánh sáng",
                    B: "Để não nghỉ ngơi và phục hồi",
                    C: "Để tiết kiệm thời gian",
                    D: "Để tránh làm việc"
                },
                correct: "B",
                explanation: "Ngủ giúp não bộ nghỉ ngơi, sửa chữa và ghi nhớ thông tin!"
            },
            {
                question: "Vì sao chúng ta bị cảm lạnh?",
                answers: {
                    A: "Vì trời lạnh",
                    B: "Vì virus tấn công",
                    C: "Vì ăn ít",
                    D: "Vì mệt mỏi"
                },
                correct: "B",
                explanation: "Virus cảm lạnh xâm nhập cơ thể làm ta bị ốm!"
            },
            {
                question: "Vì sao ta có thể nghe thấy tiếng vang?",
                answers: {
                    A: "Vì âm thanh bị phản xạ",
                    B: "Vì tai nghe rất tốt",
                    C: "Vì không khí truyền âm",
                    D: "Vì có sóng radio"
                },
                correct: "A",
                explanation: "Âm thanh bị phản xạ từ vật cản và quay lại tai chúng ta!"
            },
            
            // Vật lý hàng ngày
            {
                question: "Vì sao kem tan khi để ngoài nắng?",
                answers: {
                    A: "Vì nhiệt làm tan chảy",
                    B: "Vì gió thổi",
                    C: "Vì ánh sáng mạnh",
                    D: "Vì không khí nóng"
                },
                correct: "A",
                explanation: "Nhiệt độ cao làm kem chuyển từ thể rắn sang thể lỏng!"
            },
            {
                question: "Vì sao chúng ta thấy chớp trước khi nghe sấm?",
                answers: {
                    A: "Vì ánh sáng nhanh hơn âm thanh",
                    B: "Vì mắt tốt hơn tai",
                    C: "Vì chớp to hơn sấm",
                    D: "Vì chớp xảy ra trước"
                },
                correct: "A",
                explanation: "Ánh sáng di chuyển nhanh hơn âm thanh rất nhiều!"
            },
            {
                question: "Vì sao đá rơi xuống đất?",
                answers: {
                    A: "Vì trọng lực hút",
                    B: "Vì đá nặng",
                    C: "Vì gió thổi",
                    D: "Vì đất hút"
                },
                correct: "A",
                explanation: "Trọng lực của Trái Đất hút mọi vật về phía mình!"
            },
            
            // Động vật
            {
                question: "Vì sao lông vũ giúp chim bay?",
                answers: {
                    A: "Vì lông rất đẹp",
                    B: "Vì nhẹ và tạo lực nâng",
                    C: "Vì có màu sắc",
                    D: "Vì mềm mại"
                },
                correct: "B",
                explanation: "Lông vũ nhẹ và có hình dạng đặc biệt tạo lực nâng!"
            },
            {
                question: "Vì sao cá có thể thở dưới nước?",
                answers: {
                    A: "Vì có mang lọc oxy",
                    B: "Vì uống nước",
                    C: "Vì có phổi đặc biệt",
                    D: "Vì không cần thở"
                },
                correct: "A",
                explanation: "Mang của cá lọc oxy từ nước để cá có thể thở!"
            },
            {
                question: "Vì sao con mèo luôn rơi đúng tư thế?",
                answers: {
                    A: "Vì mèo thông minh",
                    B: "Vì có phản xạ thăng bằng",
                    C: "Vì tập luyện",
                    D: "Vì có ma thuật"
                },
                correct: "B",
                explanation: "Mèo có phản xạ tự động xoay người để rơi đúng tư thế!"
            },
            
            // Thực vật
            {
                question: "Vì sao hoa hướng dương quay theo mặt trời?",
                answers: {
                    A: "Vì thích ánh sáng",
                    B: "Vì có tế bào đặc biệt",
                    C: "Vì gió thổi",
                    D: "Vì muốn ấm"
                },
                correct: "B",
                explanation: "Tế bào ở thân hoa hướng dương giúp nó xoay theo hướng mặt trời!"
            },
            {
                question: "Vì sao cây cần nước?",
                answers: {
                    A: "Để uống cho mát",
                    B: "Để quang hợp và vận chuyển chất",
                    C: "Để rửa lá",
                    D: "Để tạo bóng mát"
                },
                correct: "B",
                explanation: "Nước giúp cây quang hợp và vận chuyển chất dinh dưỡng!"
            },
            
            // Thời tiết
            {
                question: "Vì sao có gió?",
                answers: {
                    A: "Vì không khí di chuyển",
                    B: "Vì cây tạo ra",
                    C: "Vì máy quạt lớn",
                    D: "Vì người thổi"
                },
                correct: "A",
                explanation: "Không khí nóng nhẹ hơn không khí lạnh nên tạo ra gió!"
            },
            {
                question: "Vì sao có mưa?",
                answers: {
                    A: "Vì mây khóc",
                    B: "Vì nước bay hơi rồi ngưng tụ",
                    C: "Vì trời buồn",
                    D: "Vì máy phun nước"
                },
                correct: "B",
                explanation: "Nước bay hơi lên cao, ngưng tụ thành giọt và rơi xuống!"
            },
            
            // Vũ trụ
            {
                question: "Vì sao ban đêm thấy sao?",
                answers: {
                    A: "Vì sao bật đèn",
                    B: "Vì sao phát sáng như mặt trời",
                    C: "Vì sao gần hơn",
                    D: "Vì sao to hơn"
                },
                correct: "B",
                explanation: "Các ngôi sao là những mặt trời xa xôi đang phát sáng!"
            },
            {
                question: "Vì sao mặt trăng thay đổi hình dạng?",
                answers: {
                    A: "Vì mặt trăng co giãn",
                    B: "Vì ánh sáng mặt trời chiếu",
                    C: "Vì mây che khuất",
                    D: "Vì mặt trăng quay"
                },
                correct: "B",
                explanation: "Mặt trăng phản chiếu ánh sáng mặt trời với nhiều góc độ khác nhau!"
            },
            
            // Công nghệ đời sống
            {
                question: "Vì sao nam châm hút sắt?",
                answers: {
                    A: "Vì nam châm thích sắt",
                    B: "Vì có từ trường",
                    C: "Vì sắt muốn bám",
                    D: "Vì có keo dính"
                },
                correct: "B",
                explanation: "Nam châm tạo ra từ trường có thể hút các vật bằng sắt!"
            },
            {
                question: "Vì sao điện thoại có thể gọi xa?",
                answers: {
                    A: "Vì nói to",
                    B: "Vì có sóng điện từ",
                    C: "Vì có dây dài",
                    D: "Vì có magic"
                },
                correct: "B",
                explanation: "Điện thoại sử dụng sóng điện từ để truyền tín hiệu đi xa!"
            },
            
            // Sinh hoạt hàng ngày
            {
                question: "Vì sao xà phòng có thể làm sạch?",
                answers: {
                    A: "Vì có chất tẩy rửa",
                    B: "Vì trơn láng",
                    C: "Vì thơm",
                    D: "Vì màu trắng"
                },
                correct: "A",
                explanation: "Xà phòng có chất hoạt động bề mặt giúp loại bỏ bụi bẩn!"
            },
            {
                question: "Vì sao nước đóng băng thành đá?",
                answers: {
                    A: "Vì lạnh làm nước cứng lại",
                    B: "Vì thêm chất đặc biệt",
                    C: "Vì nước sợ lạnh",
                    D: "Vì nước muốn thành đá"
                },
                correct: "A",
                explanation: "Nhiệt độ thấp làm các phân tử nước liên kết chặt và cứng lại!"
            },
            
            // Môi trường
            {
                question: "Vì sao cần bảo vệ môi trường?",
                answers: {
                    A: "Để đẹp hơn",
                    B: "Để con người và động vật sống khỏe",
                    C: "Để tiết kiệm tiền",
                    D: "Để có nhiều cây"
                },
                correct: "B",
                explanation: "Môi trường sạch giúp tất cả sinh vật sống khỏe mạnh!"
            },
            {
                question: "Vì sao không nên xả rác bừa bãi?",
                answers: {
                    A: "Vì bị phạt",
                    B: "Vì gây ô nhiễm và có hại",
                    C: "Vì xấu xí",
                    D: "Vì tốn chỗ"
                },
                correct: "B",
                explanation: "Rác thải gây ô nhiễm đất, nước và không khí, có hại cho sức khỏe!"
            }
        ];

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedQuestions = [];
        this.isAnswering = true;
        this.soundEnabled = true;
        this.startTime = null;
        this.timeLimit = 30; // 30 seconds per question
        this.currentTimer = null;
        this.streakCount = 0;
        this.maxStreak = 0;

        this.initializeElements();
        this.setupEventListeners();
        this.setupSoundEffects();
        this.selectRandomQuestions();
        this.startFloatingAnimations();
    }    initializeElements() {
        // Screens
        this.startScreen = document.getElementById('startScreen');
        this.gameScreen = document.getElementById('gameScreen');
        this.resultScreen = document.getElementById('resultScreen');
        
        // Game elements
        this.progressFill = document.getElementById('progressFill');
        this.currentQuestionSpan = document.getElementById('currentQuestion');
        this.currentScoreSpan = document.getElementById('currentScore');
        this.questionText = document.getElementById('questionText');
        this.answerButtons = document.querySelectorAll('.answer-btn');
        this.feedback = document.getElementById('feedback');
        
        // Answer elements
        this.answerA = document.getElementById('answerA');
        this.answerB = document.getElementById('answerB');
        this.answerC = document.getElementById('answerC');
        this.answerD = document.getElementById('answerD');
        
        // Result elements
        this.resultTitle = document.getElementById('resultTitle');
        this.finalScore = document.getElementById('finalScore');
        this.correctAnswers = document.getElementById('correctAnswers');
        this.wrongAnswers = document.getElementById('wrongAnswers');
        this.encouragement = document.getElementById('encouragement');
        this.achievements = document.getElementById('achievements');
        
        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.soundToggle = document.getElementById('soundToggle');
        
        // Floating elements
        this.floatingEmojis = document.getElementById('floatingEmojis');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.shareBtn.addEventListener('click', () => this.shareResults());
        this.soundToggle.addEventListener('click', () => this.toggleSound());
        
        this.answerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectAnswer(e.target.closest('.answer-btn')));
        });
    }

    setupSoundEffects() {
        this.sounds = {
            correct: this.createBeep(800, 0.1),
            incorrect: this.createBeep(400, 0.1),
            click: this.createBeep(600, 0.05),
            win: this.createBeep(1000, 0.2)
        };
    }

    createBeep(frequency, duration) {
        return () => {
            if (!this.soundEnabled) return;
            
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        };
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const icon = this.soundToggle.querySelector('i');
        icon.className = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        this.playSound('click');
    }

    playSound(type) {
        if (this.sounds[type]) {
            this.sounds[type]();
        }
    }

    startFloatingAnimations() {
        const emojis = ['🌟', '✨', '💫', '⭐', '🎈', '🌈', '🦋', '🌸', '🍀', '🎭'];
        
        setInterval(() => {
            this.createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
        }, 3000);
    }

    createFloatingEmoji(emoji) {
        const floatingEmoji = document.createElement('div');
        floatingEmoji.className = 'floating-emoji';
        floatingEmoji.textContent = emoji;
        floatingEmoji.style.left = Math.random() * window.innerWidth + 'px';
        floatingEmoji.style.bottom = '0px';
        
        this.floatingEmojis.appendChild(floatingEmoji);
        
        setTimeout(() => {
            if (floatingEmoji.parentNode) {
                floatingEmoji.parentNode.removeChild(floatingEmoji);
            }
        }, 5000);
    }

    selectRandomQuestions() {
        // Shuffle questions and select 10
        const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
        this.selectedQuestions = shuffled.slice(0, 10);
    }    startGame() {
        this.playSound('click');
        this.hideScreen(this.startScreen);
        this.showScreen(this.gameScreen);
        this.loadQuestion();
        this.updateScore();
    }    loadQuestion() {
        if (this.currentQuestionIndex >= this.selectedQuestions.length) {
            // Show completion notification before results
            this.showCompletionNotification();
            return;
        }

        const question = this.selectedQuestions[this.currentQuestionIndex];
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / 10) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        // Update question counter
        this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
        
        // Update question and answers with animation
        this.animateQuestionChange();
        
        setTimeout(() => {
            this.questionText.textContent = question.question;
            this.answerA.textContent = question.answers.A;
            this.answerB.textContent = question.answers.B;
            this.answerC.textContent = question.answers.C;
            this.answerD.textContent = question.answers.D;
        }, 150);
        
        // Reset answer buttons
        this.answerButtons.forEach(btn => {
            btn.classList.remove('correct', 'incorrect', 'disabled');
        });
        
        this.isAnswering = true;
        this.hideFeedback();
        
        // Start timer for question
        this.startQuestionTimer();
    }

    startQuestionTimer() {
        this.startTime = Date.now();
        // Optional: Add visual timer countdown
        const timeDisplay = document.querySelector('.time-remaining');
        if (timeDisplay) {
            let timeLeft = this.timeLimit;
            this.currentTimer = setInterval(() => {
                timeLeft--;
                timeDisplay.textContent = timeLeft;
                
                if (timeLeft <= 5) {
                    timeDisplay.style.color = '#f56565';
                    timeDisplay.style.animation = 'pulse 0.5s infinite';
                }
                
                if (timeLeft <= 0) {
                    this.timeUp();
                }
            }, 1000);
        }
    }

    stopQuestionTimer() {
        if (this.currentTimer) {
            clearInterval(this.currentTimer);
            this.currentTimer = null;
        }
    }

    timeUp() {
        if (!this.isAnswering) return;
        
        this.stopQuestionTimer();
        this.isAnswering = false;
        
        // Show correct answer
        const question = this.selectedQuestions[this.currentQuestionIndex];
        this.answerButtons.forEach(btn => {
            btn.classList.add('disabled');
            if (btn.dataset.answer === question.correct) {
                btn.classList.add('correct');
            }
        });
        
        // Reset streak
        this.streakCount = 0;
        
        this.showFeedback(false, question.explanation + " (Hết thời gian!)");
        
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.loadQuestion();
        }, 2500);
    }

    animateQuestionChange() {
        const questionCard = document.querySelector('.question-card');
        const answersGrid = document.querySelector('.answers-grid');
        
        questionCard.style.transform = 'translateY(-10px)';
        questionCard.style.opacity = '0.7';
        answersGrid.style.transform = 'translateY(10px)';
        answersGrid.style.opacity = '0.7';
        
        setTimeout(() => {
            questionCard.style.transform = 'translateY(0)';
            questionCard.style.opacity = '1';
            answersGrid.style.transform = 'translateY(0)';
            answersGrid.style.opacity = '1';
        }, 200);
    }

    updateScore() {
        if (this.currentScoreSpan) {
            this.currentScoreSpan.textContent = this.score;
        }
    }

    resetTimer() {
        // Clear existing timer
        if (this.currentTimer) {
            clearInterval(this.currentTimer);
        }
        
        // Reset time display
        const timeDisplay = document.getElementById('timeDisplay');
        timeDisplay.textContent = this.timeLimit;
        
        // Start new timer
        this.currentTimer = setInterval(() => {
            this.timeLimit--;
            timeDisplay.textContent = this.timeLimit;
            
            if (this.timeLimit <= 0) {
                clearInterval(this.currentTimer);
                this.handleTimeOut();
            }
        }, 1000);
    }

    handleTimeOut() {
        this.isAnswering = false;
        this.answerButtons.forEach(btn => {
            btn.classList.add('disabled');
            
            if (btn.dataset.answer === this.selectedQuestions[this.currentQuestionIndex].correct) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('incorrect');
            }
        });
        
        // Show feedback popup indicating timeout
        this.showFeedback(false, "Thời gian đã hết! Đáp án đúng là: " + this.selectedQuestions[this.currentQuestionIndex].correct);
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.loadQuestion();
        }, 2500);
    }

    selectAnswer(selectedBtn) {
        if (!this.isAnswering) return;
        
        // Stop timer
        this.stopQuestionTimer();
        
        this.isAnswering = false;
        const selectedAnswer = selectedBtn.dataset.answer;
        const question = this.selectedQuestions[this.currentQuestionIndex];
        const isCorrect = selectedAnswer === question.correct;
        
        // Calculate answer time bonus
        const answerTime = (Date.now() - this.startTime) / 1000;
        let timeBonus = 0;
        if (isCorrect && answerTime < 10) {
            timeBonus = Math.floor((10 - answerTime) / 2);
        }
        
        // Update streak
        if (isCorrect) {
            this.streakCount++;
            this.maxStreak = Math.max(this.maxStreak, this.streakCount);
        } else {
            this.streakCount = 0;
        }
        
        // Play sound effect
        this.playSound(isCorrect ? 'correct' : 'incorrect');
        
        // Update score with bonus
        if (isCorrect) {
            this.score += (1 + timeBonus);
            this.updateScore();
            
            // Show time bonus notification
            if (timeBonus > 0) {
                this.showTimeBonus(timeBonus);
            }
            
            // Show streak notification
            if (this.streakCount >= 3) {
                this.showStreakBonus(this.streakCount);
            }
        }
        
        // Show visual feedback with enhanced animations
        this.answerButtons.forEach(btn => {
            btn.classList.add('disabled');
            
            if (btn.dataset.answer === question.correct) {
                btn.classList.add('correct');
                this.createCorrectParticles(btn);
            } else if (btn === selectedBtn && !isCorrect) {
                btn.classList.add('incorrect');
                this.createIncorrectShake(btn);
            }
        });
        
        // Show feedback popup with enhanced effects
        this.showFeedback(isCorrect, question.explanation);
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.loadQuestion();
        }, 2500);
    }

    createCorrectParticles(button) {
        const particles = ['✨', '⭐', '🎉', '💫'];
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                particle.style.position = 'absolute';
                particle.style.fontSize = '1.5rem';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                
                const rect = button.getBoundingClientRect();
                particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                
                particle.style.animation = 'particleExplode 1s ease-out forwards';
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1000);
            }, i * 100);
        }
    }

    createIncorrectShake(button) {
        button.style.animation = 'none';
        setTimeout(() => {
            button.style.animation = 'incorrectShake 0.5s ease-in-out';
        }, 10);
    }

    showFeedback(isCorrect, explanation) {
        const feedbackIcon = this.feedback.querySelector('.feedback-icon');
        const feedbackTitle = this.feedback.querySelector('.feedback-title');
        const feedbackText = this.feedback.querySelector('.feedback-text');
        
        if (isCorrect) {
            feedbackIcon.textContent = '🎉';
            feedbackTitle.textContent = 'Tuyệt vời!';
            feedbackText.textContent = explanation;
            this.createCelebrationEffect();
        } else {
            feedbackIcon.textContent = '🤔';
            feedbackTitle.textContent = 'Gần đúng rồi!';
            feedbackText.textContent = explanation;
        }
        
        this.feedback.classList.remove('hidden');
    }

    createCelebrationEffect() {
        const colors = ['🎊', '🎉', '✨', '🌟', '💫'];
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.position = 'fixed';
                confetti.style.fontSize = '2rem';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-50px';
                confetti.style.animation = 'confettiFall 3s ease-out forwards';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 100);
        }
    }

    hideFeedback() {
        this.feedback.classList.add('hidden');
    }

    showScreen(screen) {
        screen.classList.remove('hidden');
        screen.style.opacity = '0';
        screen.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            screen.style.opacity = '1';
            screen.style.transform = 'translateY(0)';
        }, 50);
    }

    hideScreen(screen) {
        screen.style.opacity = '0';
        screen.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            screen.classList.add('hidden');
        }, 300);
    }

    showTimeBonus(bonus) {
        const bonusEl = document.createElement('div');
        bonusEl.className = 'time-bonus';
        bonusEl.innerHTML = `<i class="fas fa-clock"></i> +${bonus} Nhanh tay!`;
        bonusEl.style.cssText = `
            position: fixed;
            top: 30%;
            right: 20px;
            background: var(--gradient-warning);
            color: white;
            padding: 10px 15px;
            border-radius: var(--radius-lg);
            font-weight: 600;
            z-index: 9999;
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2s forwards;
        `;
        
        document.body.appendChild(bonusEl);
        
        setTimeout(() => {
            if (bonusEl.parentNode) {
                bonusEl.parentNode.removeChild(bonusEl);
            }
        }, 2500);
    }

    showStreakBonus(streak) {
        const streakEl = document.createElement('div');
        streakEl.className = 'streak-bonus';
        streakEl.innerHTML = `<i class="fas fa-fire"></i> ${streak} liên tiếp!`;
        streakEl.style.cssText = `
            position: fixed;
            top: 40%;
            right: 20px;
            background: var(--gradient-error);
            color: white;
            padding: 10px 15px;
            border-radius: var(--radius-lg);
            font-weight: 600;
            z-index: 9999;
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2s forwards;
        `;
        
        document.body.appendChild(streakEl);
        
        setTimeout(() => {
            if (streakEl.parentNode) {
                streakEl.parentNode.removeChild(streakEl);
            }
        }, 2500);
    }

    getAchievements() {
        const achievements = [];
        
        if (this.score === 10) {
            achievements.push({ icon: '🏆', text: 'Hoàn hảo!' });
        }
        if (this.score >= 8) {
            achievements.push({ icon: '🧠', text: 'Bộ não siêu việt' });
        }
        if (this.score >= 6) {
            achievements.push({ icon: '🌟', text: 'Ngôi sao tri thức' });
        }
        if (this.score >= 4) {
            achievements.push({ icon: '📚', text: 'Học sinh chăm chỉ' });
        }
        if (this.score <= 2) {
            achievements.push({ icon: '🌱', text: 'Mầm non tri thức' });
        }
        
        // Streak achievements
        if (this.maxStreak >= 5) {
            achievements.push({ icon: '🔥', text: `${this.maxStreak} liên tiếp!` });
        }
        
        // Speed achievements
        if (this.score > 10) { // Bonus points from speed
            achievements.push({ icon: '⚡', text: 'Tốc độ ánh sáng' });
        }
        
        // Random motivation achievement
        const motivationAchievements = [
            { icon: '🔍', text: 'Nhà khám phá nhỏ' },
            { icon: '💡', text: 'Ý tưởng sáng tạo' },
            { icon: '🎯', text: 'Tập trung cao độ' },
            { icon: '⚡', text: 'Tư duy nhanh nhạy' }
        ];
          achievements.push(motivationAchievements[Math.floor(Math.random() * motivationAchievements.length)]);
        
        return achievements;
    }

    showCompletionNotification() {
        // Create completion notification overlay
        const completionOverlay = document.createElement('div');
        completionOverlay.className = 'completion-overlay';
        completionOverlay.innerHTML = `
            <div class="completion-notification glass-card">
                <div class="completion-icon">🎊</div>
                <h2 class="completion-title">Xuất sắc!</h2>
                <p class="completion-message">Bạn đã hoàn thành tất cả 10 câu hỏi!</p>
                <div class="completion-animation">
                    <div class="completion-sparkles">
                        <span>✨</span>
                        <span>🌟</span>
                        <span>💫</span>
                        <span>⭐</span>
                        <span>🎉</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles for completion notification
        completionOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        `;
        
        document.body.appendChild(completionOverlay);
        
        // Play completion sound
        this.playSound('win');
        
        // Create massive celebration effect
        this.createMassiveCelebration();
        
        // Auto-remove after 3 seconds and show results
        setTimeout(() => {
            completionOverlay.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                completionOverlay.remove();
                this.showResults();
            }, 500);
        }, 3000);
    }

    createMassiveCelebration() {
        const celebrationEmojis = ['🎊', '🎉', '✨', '🌟', '💫', '⭐', '🎈', '🎭', '🏆', '🥳'];
        
        // Create 20 celebration particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
                particle.style.position = 'fixed';
                particle.style.fontSize = '2.5rem';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = '-50px';
                particle.style.animation = 'confettiFall 4s ease-out forwards';
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 4000);
            }, i * 100);
        }
    }

    showResults() {
        this.playSound('win');
        this.hideScreen(this.gameScreen);
        this.showScreen(this.resultScreen);
        
        // Calculate results
        const correctCount = this.score >= 10 ? Math.min(this.score, 10) : this.score;
        const wrongCount = 10 - correctCount;
        const percentage = (correctCount / 10) * 100;
        
        // Update result displays
        this.finalScore.textContent = correctCount;
        this.correctAnswers.textContent = correctCount;
        this.wrongAnswers.textContent = wrongCount;
        
        // Animate score ring
        const scoreProgress = document.getElementById('scoreProgress');
        const circumference = 2 * Math.PI * 45; // radius = 45
        const offset = circumference - (percentage / 100) * circumference;
        
        setTimeout(() => {
            scoreProgress.style.strokeDashoffset = offset;
        }, 500);
        
        // Set result title and encouragement based on score
        let title, encouragement, character;
        
        if (correctCount === 10) {
            title = "Thiên tài nhỏ! 🧠";
            encouragement = "Hoàn hảo! Bạn đã trả lời đúng tất cả các câu hỏi. Thật tuyệt vời!";
            character = "🏆";
        } else if (correctCount >= 8) {
            title = "Xuất sắc! 🌟";
            encouragement = "Tuyệt vời! Bạn có kiến thức rất tốt. Hãy tiếp tục học hỏi nhé!";
            character = "🎉";
        } else if (correctCount >= 6) {
            title = "Giỏi lắm! 👏";
            encouragement = "Khá tốt! Bạn đã nắm được nhiều kiến thức thú vị rồi đấy!";
            character = "😊";
        } else if (correctCount >= 4) {
            title = "Cố gắng lên! 💪";
            encouragement = "Không sao! Hãy đọc thêm sách và thử lại nhé. Bạn sẽ giỏi hơn!";
            character = "🤔";
        } else {
            title = "Học hỏi thêm nhé! 📚";
            encouragement = "Đừng nản lòng! Mỗi câu hỏi đều giúp bạn học được điều mới. Thử lại nào!";
            character = "🌱";
        }
        
        this.resultTitle.textContent = title;
        this.encouragement.textContent = encouragement;
        
        // Update character
        const characterMain = document.querySelector('.character-main');
        if (characterMain) {
            characterMain.textContent = character;
        }
        
        // Show achievements
        const achievements = this.getAchievements();
        this.achievements.innerHTML = '';
        achievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = 'achievement';
            achievementEl.innerHTML = `<span class="achievement-icon">${achievement.icon}</span> ${achievement.text}`;
            this.achievements.appendChild(achievementEl);
        });
        
        // Create celebration effect for good scores
        if (correctCount >= 6) {
            setTimeout(() => {
                this.createCelebrationEffect();
            }, 1000);
        }
    }

    resetGame() {
        this.playSound('click');
        
        // Reset game state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.streakCount = 0;
        this.maxStreak = 0;
        this.isAnswering = true;
        
        // Select new random questions
        this.selectRandomQuestions();
        
        // Reset UI
        this.progressFill.style.width = '0%';
        this.updateScore();
        
        // Reset score ring
        const scoreProgress = document.getElementById('scoreProgress');
        if (scoreProgress) {
            scoreProgress.style.strokeDashoffset = '283';
        }
        
        // Go back to start screen
        this.hideScreen(this.resultScreen);
        this.showScreen(this.startScreen);
    }

    shareResults() {
        const correctCount = this.score >= 10 ? Math.min(this.score, 10) : this.score;
        const text = `🧠 Tôi vừa chơi "Hỏi Đáp Vui - Khám Phá Thế Giới Cùng Bé" và đạt được ${correctCount}/10 điểm! 🎉\n\nHãy thử thách bản thân với những câu hỏi "Vì sao" thú vị tại: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Hỏi Đáp Vui - Khám Phá Thế Giới Cùng Bé',
                text: text,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                this.fallbackShare(text);
            });
        } else {
            this.fallbackShare(text);
        }
    }

    fallbackShare(text) {
        // Copy to clipboard as fallback
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('📋 Đã sao chép kết quả! Hãy chia sẻ với bạn bè nhé!');
            }).catch(() => {
                this.showShareDialog(text);
            });
        } else {
            this.showShareDialog(text);
        }
    }

    showShareDialog(text) {
        const shareDialog = document.createElement('div');
        shareDialog.className = 'share-dialog';
        shareDialog.innerHTML = `
            <div class="share-content glass-card">
                <h3>Chia sẻ kết quả 📤</h3>
                <textarea readonly>${text}</textarea>
                <div class="share-buttons">
                    <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">Đóng</button>
                </div>
            </div>
        `;
        
        shareDialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(shareDialog);
        
        // Auto-select text
        const textarea = shareDialog.querySelector('textarea');
        textarea.focus();
        textarea.select();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-success);
            color: white;
            padding: 15px 20px;
            border-radius: var(--radius-lg);
            font-weight: 600;
            z-index: 9999;
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 3s forwards;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3500);
    }
}

// Enhanced animations and effects
const additionalStyles = `
    @keyframes particleExplode {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(1.5) translateY(-50px);
        }
    }
    
    @keyframes incorrectShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
      @keyframes confettiFall {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .completion-notification {
        text-align: center;
        padding: 40px;
        max-width: 400px;
        margin: 0 auto;
    }
    
    .completion-icon {
        font-size: 4rem;
        margin-bottom: 20px;
        animation: bounce 0.8s ease infinite;
    }
    
    .completion-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 15px;
        color: var(--text-light);
    }
    
    .completion-message {
        font-size: 1.1rem;
        color: var(--text-muted);
        margin-bottom: 30px;
    }
    
    .completion-sparkles {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }
    
    .completion-sparkles span {
        font-size: 1.5rem;
        animation: sparkle 1.5s ease infinite;
    }
    
    .completion-sparkles span:nth-child(1) { animation-delay: 0s; }
    .completion-sparkles span:nth-child(2) { animation-delay: 0.2s; }
    .completion-sparkles span:nth-child(3) { animation-delay: 0.4s; }
    .completion-sparkles span:nth-child(4) { animation-delay: 0.6s; }
    .completion-sparkles span:nth-child(5) { animation-delay: 0.8s; }
    
    @keyframes sparkle {
        0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
    }
    
    .share-content {
        padding: 30px;
        max-width: 500px;
        width: 90%;
        text-align: center;
    }
    
    .share-content h3 {
        margin-bottom: 20px;
        color: var(--text-light);
    }
    
    .share-content textarea {
        width: 100%;
        height: 120px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: 15px;
        color: var(--text-light);
        font-family: inherit;
        font-size: 0.9rem;
        resize: none;
        margin-bottom: 20px;
    }
    
    .share-buttons {
        display: flex;
        justify-content: center;
        gap: 15px;
    }
    
    .notification {
        font-weight: 500;
        text-align: center;
        max-width: 90%;
        box-shadow: var(--glass-shadow);
    }
    
    .achievement {
        transition: all 0.3s ease;
    }
    
    .achievement:hover {
        transform: translateY(-2px);
        background: var(--glass-hover);
    }
    
    .achievement-icon {
        font-style: normal;
    }
    
    .score-svg {
        filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.3));
    }
`;

// Add additional styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the quiz app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
    
    // Register Service Worker for PWA functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});

// Add some fun interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add floating animations to emojis
    const emojis = ['🌟', '🎈', '🌈', '⭐', '🎉', '🦋'];
    
    function createFloatingEmoji() {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.fontSize = '20px';
        emoji.style.left = Math.random() * window.innerWidth + 'px';
        emoji.style.top = window.innerHeight + 'px';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '-1';
        emoji.style.animation = 'floatUp 8s linear forwards';
        
        document.body.appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, 8000);
    }
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            to {
                transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create floating emojis periodically
    setInterval(createFloatingEmoji, 3000);
    
    // Add click effect to buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn') || e.target.classList.contains('answer-btn')) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - e.target.offsetLeft - 10) + 'px';
            ripple.style.top = (e.clientY - e.target.offsetTop - 10) + 'px';
            
            e.target.style.position = 'relative';
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});