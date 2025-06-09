// Educational Game - Trí Tuệ Nhỏ
// Modern JavaScript implementation with multiple game modes

class GameState {
    constructor() {
        this.currentMode = null;
        this.currentSubject = null;
        this.currentLevel = 1;
        this.currentDifficulty = 'easy';
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.score = 0;
        this.lives = 3;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.startTime = null;
        this.timeLimit = 30;
        this.timer = null;
        this.powerUps = {
            skip: 2,
            hint: 1,
            time: 1
        };
        this.isGameActive = false;
        this.settings = {
            soundEffects: true,
            backgroundMusic: true,
            volume: 70,
            keyboardHints: true,
            vibration: true
        };
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.lives = 3;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.startTime = Date.now();
        this.isGameActive = false;
        this.powerUps = {
            skip: 2,
            hint: 1,
            time: 1
        };
    }

    updateScore(points) {
        this.score += points;
        this.updateScoreDisplay();
    }

    updateScoreDisplay() {
        const scoreElement = document.getElementById('currentScore');
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
    }

    updateProgress() {
        const progressBar = document.getElementById('gameProgress');
        const progressText = document.getElementById('progressText');
        
        if (progressBar && progressText) {
            const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${this.currentQuestionIndex + 1}/${this.questions.length}`;
        }
    }

    updateLives() {
        const heartsContainer = document.getElementById('heartsContainer');
        if (heartsContainer) {
            heartsContainer.innerHTML = '';
            for (let i = 0; i < this.lives; i++) {
                const heart = document.createElement('span');
                heart.className = 'heart';
                heart.textContent = '❤️';
                heartsContainer.appendChild(heart);
            }
        }
    }
}

class QuestionDatabase {
    constructor() {        this.questions = {
            math: {
                easy: [
                    {
                        question: "5 + 3 = ?",
                        answers: ["8", "7", "9", "6"],
                        correct: 0
                    },
                    {
                        question: "10 - 4 = ?",
                        answers: ["6", "5", "7", "8"],
                        correct: 0
                    },
                    {
                        question: "2 × 3 = ?",
                        answers: ["6", "5", "7", "8"],
                        correct: 0
                    },
                    {
                        question: "8 ÷ 2 = ?",
                        answers: ["4", "3", "5", "6"],
                        correct: 0
                    },
                    {
                        question: "7 + 2 = ?",
                        answers: ["9", "8", "10", "7"],
                        correct: 0
                    },
                    {
                        question: "3 + 4 = ?",
                        answers: ["7", "6", "8", "5"],
                        correct: 0
                    },
                    {
                        question: "9 - 5 = ?",
                        answers: ["4", "3", "5", "6"],
                        correct: 0
                    },
                    {
                        question: "6 × 2 = ?",
                        answers: ["12", "10", "14", "8"],
                        correct: 0
                    },
                    {
                        question: "15 ÷ 3 = ?",
                        answers: ["5", "4", "6", "3"],
                        correct: 0
                    },
                    {
                        question: "1 + 8 = ?",
                        answers: ["9", "7", "10", "8"],
                        correct: 0
                    },
                    {
                        question: "12 - 7 = ?",
                        answers: ["5", "4", "6", "3"],
                        correct: 0
                    },
                    {
                        question: "4 × 3 = ?",
                        answers: ["12", "10", "14", "15"],
                        correct: 0
                    },
                    {
                        question: "20 ÷ 4 = ?",
                        answers: ["5", "4", "6", "7"],
                        correct: 0
                    },
                    {
                        question: "6 + 6 = ?",
                        answers: ["12", "11", "13", "10"],
                        correct: 0
                    },
                    {
                        question: "14 - 8 = ?",
                        answers: ["6", "5", "7", "8"],
                        correct: 0
                    },
                    {
                        question: "5 × 4 = ?",
                        answers: ["20", "18", "22", "16"],
                        correct: 0
                    },
                    {
                        question: "18 ÷ 6 = ?",
                        answers: ["3", "2", "4", "5"],
                        correct: 0
                    },
                    {
                        question: "11 + 7 = ?",
                        answers: ["18", "17", "19", "16"],
                        correct: 0
                    },
                    {
                        question: "16 - 9 = ?",
                        answers: ["7", "6", "8", "5"],
                        correct: 0
                    },                    {
                        question: "7 × 3 = ?",
                        answers: ["21", "20", "22", "18"],
                        correct: 0
                    },
                    {
                        question: "9 + 2 = ?",
                        answers: ["11", "10", "12", "9"],
                        correct: 0
                    },
                    {
                        question: "8 - 3 = ?",
                        answers: ["5", "4", "6", "7"],
                        correct: 0
                    },
                    {
                        question: "4 × 2 = ?",
                        answers: ["8", "6", "10", "7"],
                        correct: 0
                    },
                    {
                        question: "12 ÷ 4 = ?",
                        answers: ["3", "2", "4", "5"],
                        correct: 0
                    },
                    {
                        question: "6 + 5 = ?",
                        answers: ["11", "10", "12", "9"],
                        correct: 0
                    },
                    {
                        question: "13 - 6 = ?",
                        answers: ["7", "6", "8", "5"],
                        correct: 0
                    },
                    {
                        question: "3 × 5 = ?",
                        answers: ["15", "14", "16", "13"],
                        correct: 0
                    },
                    {
                        question: "16 ÷ 4 = ?",
                        answers: ["4", "3", "5", "6"],
                        correct: 0
                    },
                    {
                        question: "8 + 4 = ?",
                        answers: ["12", "11", "13", "10"],
                        correct: 0
                    },
                    {
                        question: "14 - 5 = ?",
                        answers: ["9", "8", "10", "7"],
                        correct: 0
                    }
                ],medium: [
                    {
                        question: "15 + 28 = ?",
                        answers: ["43", "42", "44", "41"],
                        correct: 0
                    },
                    {
                        question: "64 - 27 = ?",
                        answers: ["37", "36", "38", "35"],
                        correct: 0
                    },
                    {
                        question: "12 × 5 = ?",
                        answers: ["60", "55", "65", "50"],
                        correct: 0
                    },
                    {
                        question: "84 ÷ 4 = ?",
                        answers: ["21", "20", "22", "19"],
                        correct: 0
                    },
                    {
                        question: "9² = ?",
                        answers: ["81", "72", "90", "80"],
                        correct: 0
                    },
                    {
                        question: "23 + 45 = ?",
                        answers: ["68", "67", "69", "66"],
                        correct: 0
                    },
                    {
                        question: "75 - 38 = ?",
                        answers: ["37", "36", "38", "35"],
                        correct: 0
                    },
                    {
                        question: "14 × 6 = ?",
                        answers: ["84", "82", "86", "80"],
                        correct: 0
                    },
                    {
                        question: "96 ÷ 8 = ?",
                        answers: ["12", "11", "13", "10"],
                        correct: 0
                    },
                    {
                        question: "7² = ?",
                        answers: ["49", "47", "51", "45"],
                        correct: 0
                    },
                    {
                        question: "36 + 47 = ?",
                        answers: ["83", "82", "84", "81"],
                        correct: 0
                    },
                    {
                        question: "82 - 49 = ?",
                        answers: ["33", "32", "34", "31"],
                        correct: 0
                    },
                    {
                        question: "15 × 7 = ?",
                        answers: ["105", "103", "107", "100"],
                        correct: 0
                    },
                    {
                        question: "144 ÷ 12 = ?",
                        answers: ["12", "11", "13", "10"],
                        correct: 0
                    },
                    {
                        question: "8² = ?",
                        answers: ["64", "62", "66", "60"],
                        correct: 0
                    },
                    {
                        question: "52 + 39 = ?",
                        answers: ["91", "90", "92", "89"],
                        correct: 0
                    },
                    {
                        question: "73 - 28 = ?",
                        answers: ["45", "44", "46", "43"],
                        correct: 0
                    },
                    {
                        question: "13 × 8 = ?",
                        answers: ["104", "102", "106", "100"],
                        correct: 0
                    },
                    {
                        question: "132 ÷ 11 = ?",
                        answers: ["12", "11", "13", "10"],
                        correct: 0
                    },                    {
                        question: "6² = ?",
                        answers: ["36", "34", "38", "32"],
                        correct: 0
                    },
                    {
                        question: "25 + 18 = ?",
                        answers: ["43", "42", "44", "41"],
                        correct: 0
                    },
                    {
                        question: "56 - 29 = ?",
                        answers: ["27", "26", "28", "25"],
                        correct: 0
                    },
                    {
                        question: "9 × 8 = ?",
                        answers: ["72", "70", "74", "68"],
                        correct: 0
                    },
                    {
                        question: "63 ÷ 9 = ?",
                        answers: ["7", "6", "8", "5"],
                        correct: 0
                    },
                    {
                        question: "34 + 27 = ?",
                        answers: ["61", "60", "62", "59"],
                        correct: 0
                    },
                    {
                        question: "78 - 35 = ?",
                        answers: ["43", "42", "44", "41"],
                        correct: 0
                    },
                    {
                        question: "11 × 4 = ?",
                        answers: ["44", "42", "46", "40"],
                        correct: 0
                    },
                    {
                        question: "72 ÷ 8 = ?",
                        answers: ["9", "8", "10", "7"],
                        correct: 0
                    },
                    {
                        question: "5² + 3 = ?",
                        answers: ["28", "27", "29", "26"],
                        correct: 0
                    }
                ],hard: [
                    {
                        question: "125 + 347 = ?",
                        answers: ["472", "471", "473", "470"],
                        correct: 0
                    },
                    {
                        question: "24 × 15 = ?",
                        answers: ["360", "350", "370", "340"],
                        correct: 0
                    },
                    {
                        question: "√144 = ?",
                        answers: ["12", "11", "13", "10"],
                        correct: 0
                    },
                    {
                        question: "2³ × 5 = ?",
                        answers: ["40", "35", "45", "30"],
                        correct: 0
                    },
                    {
                        question: "15% của 200 = ?",
                        answers: ["30", "25", "35", "20"],
                        correct: 0
                    },
                    {
                        question: "234 + 567 = ?",
                        answers: ["801", "800", "802", "799"],
                        correct: 0
                    },
                    {
                        question: "789 - 456 = ?",
                        answers: ["333", "332", "334", "331"],
                        correct: 0
                    },
                    {
                        question: "23 × 17 = ?",
                        answers: ["391", "390", "392", "389"],
                        correct: 0
                    },
                    {
                        question: "√169 = ?",
                        answers: ["13", "12", "14", "11"],
                        correct: 0
                    },
                    {
                        question: "3⁴ = ?",
                        answers: ["81", "80", "82", "79"],
                        correct: 0
                    },
                    {
                        question: "25% của 400 = ?",
                        answers: ["100", "90", "110", "80"],
                        correct: 0
                    },
                    {
                        question: "345 + 289 = ?",
                        answers: ["634", "633", "635", "632"],
                        correct: 0
                    },
                    {
                        question: "612 - 287 = ?",
                        answers: ["325", "324", "326", "323"],
                        correct: 0
                    },
                    {
                        question: "19 × 21 = ?",
                        answers: ["399", "398", "400", "397"],
                        correct: 0
                    },
                    {
                        question: "√225 = ?",
                        answers: ["15", "14", "16", "13"],
                        correct: 0
                    },
                    {
                        question: "5³ = ?",
                        answers: ["125", "124", "126", "123"],
                        correct: 0
                    },
                    {
                        question: "30% của 150 = ?",
                        answers: ["45", "40", "50", "35"],
                        correct: 0
                    },
                    {
                        question: "456 ÷ 24 = ?",
                        answers: ["19", "18", "20", "17"],
                        correct: 0
                    },
                    {
                        question: "√196 = ?",
                        answers: ["14", "13", "15", "12"],
                        correct: 0
                    },                    {
                        question: "4³ - 2² = ?",
                        answers: ["60", "59", "61", "58"],
                        correct: 0
                    },
                    {
                        question: "278 + 165 = ?",
                        answers: ["443", "442", "444", "441"],
                        correct: 0
                    },
                    {
                        question: "500 - 237 = ?",
                        answers: ["263", "262", "264", "261"],
                        correct: 0
                    },
                    {
                        question: "17 × 19 = ?",
                        answers: ["323", "322", "324", "321"],
                        correct: 0
                    },
                    {
                        question: "576 ÷ 18 = ?",
                        answers: ["32", "31", "33", "30"],
                        correct: 0
                    },
                    {
                        question: "√100 = ?",
                        answers: ["10", "9", "11", "8"],
                        correct: 0
                    },
                    {
                        question: "40% của 250 = ?",
                        answers: ["100", "90", "110", "80"],
                        correct: 0
                    },
                    {
                        question: "12³ = ?",
                        answers: ["1728", "1720", "1730", "1710"],
                        correct: 0
                    },
                    {
                        question: "789 + 456 = ?",
                        answers: ["1245", "1244", "1246", "1243"],
                        correct: 0
                    },
                    {
                        question: "1000 - 357 = ?",
                        answers: ["643", "642", "644", "641"],
                        correct: 0
                    }
                ]
            },            vietnamese: {
                easy: [
                    {
                        question: "Từ nào viết đúng?",
                        answers: ["Con mèo", "Con méo", "Con mèw", "Con mèu"],
                        correct: 0
                    },
                    {
                        question: "Câu nào đúng?",
                        answers: ["Hôm nay trời đẹp", "Hôm nay trời đép", "Hôm nay trời đẹb", "Hôm nay trời đẹt"],
                        correct: 0
                    },
                    {
                        question: "Từ trái nghĩa của 'to' là gì?",
                        answers: ["Nhỏ", "Lớn", "Cao", "Thấp"],
                        correct: 0
                    },
                    {
                        question: "'Bé' là từ chỉ gì?",
                        answers: ["Kích thước", "Màu sắc", "Hình dạng", "Âm thanh"],
                        correct: 0
                    },
                    {
                        question: "Từ nào có nghĩa giống 'vui'?",
                        answers: ["Vui vẻ", "Buồn", "Tức giận", "Lo lắng"],
                        correct: 0
                    },
                    {
                        question: "Từ nào viết đúng?",
                        answers: ["Học sinh", "Học sính", "Hóc sinh", "Học xình"],
                        correct: 0
                    },
                    {
                        question: "Từ trái nghĩa của 'sáng' là gì?",
                        answers: ["Tối", "Sạch", "Bẩn", "Ồn"],
                        correct: 0
                    },
                    {
                        question: "Từ nào chỉ màu sắc?",
                        answers: ["Xanh", "To", "Cao", "Nhanh"],
                        correct: 0
                    },
                    {
                        question: "Từ nào viết đúng?",
                        answers: ["Bác sĩ", "Bác sí", "Bác xĩ", "Bác xí"],
                        correct: 0
                    },
                    {
                        question: "Từ đồng nghĩa với 'lạnh' là?",
                        answers: ["Mát", "Nóng", "Ấm", "Bỏng"],
                        correct: 0
                    },
                    {
                        question: "Câu nào đúng chính tả?",
                        answers: ["Em yêu gia đình", "Em yêu gia dình", "Em yêu gia đinh", "Em yêu gia đìnhh"],
                        correct: 0
                    },
                    {
                        question: "Từ nào chỉ thời gian?",
                        answers: ["Sáng", "Đỏ", "To", "Ngọt"],
                        correct: 0
                    },
                    {
                        question: "Từ trái nghĩa của 'cũ' là?",
                        answers: ["Mới", "Cao", "Thấp", "Rộng"],
                        correct: 0
                    },
                    {
                        question: "Từ nào viết đúng?",
                        answers: ["Thầy giáo", "Thầy gíao", "Thầy giào", "Thầy giáo"],
                        correct: 0
                    },
                    {
                        question: "Từ nào chỉ cảm xúc?",
                        answers: ["Vui", "Xanh", "To", "Vuông"],
                        correct: 0
                    },
                    {
                        question: "Từ đồng nghĩa với 'đẹp' là?",
                        answers: ["Xinh", "Xấu", "To", "Nhỏ"],
                        correct: 0
                    },
                    {
                        question: "Câu nào đúng?",
                        answers: ["Con chó chạy nhanh", "Con chó chạy nhan", "Con chó chạy nhánh", "Con chó chạy nhành"],
                        correct: 0
                    },                    {
                        question: "Từ nào chỉ hành động?",
                        answers: ["Chạy", "Đỏ", "To", "Tròn"],
                        correct: 0
                    },
                    {
                        question: "Từ trái nghĩa của 'dài' là?",
                        answers: ["Ngắn", "Rộng", "Hẹp", "Cao"],
                        correct: 0
                    },
                    {
                        question: "Từ nào viết đúng?",
                        answers: ["Cô giáo", "Cô gíao", "Cô giào", "Cô giao"],
                        correct: 0
                    },
                    {
                        question: "Từ nào chỉ động vật?",
                        answers: ["Gà", "Cây", "Bàn", "Sách"],
                        correct: 0
                    },
                    {
                        question: "'Ăn' là từ gì?",
                        answers: ["Động từ", "Danh từ", "Tính từ", "Trạng từ"],
                        correct: 0
                    },
                    {
                        question: "Từ trái nghĩa của 'nóng' là?",
                        answers: ["Lạnh", "Ấm", "Mát", "Bỏng"],
                        correct: 0
                    },
                    {
                        question: "Từ nào viết đúng?",
                        answers: ["Bạn bè", "Bạn bè", "Bạn bẻ", "Bạn bề"],
                        correct: 0
                    },
                    {
                        question: "Từ đồng nghĩa với 'vui' là?",
                        answers: ["Vui vẻ", "Buồn", "Tức giận", "Lo lắng"],
                        correct: 0
                    },
                    {
                        question: "Từ nào chỉ số lượng?",
                        answers: ["Năm", "Đỏ", "To", "Nhanh"],
                        correct: 0
                    },
                    {
                        question: "Từ nào viết đúng?",
                        answers: ["Gia đình", "Gia dình", "Gia đinh", "Gia đìnhh"],
                        correct: 0
                    }
                ],medium: [
                    {
                        question: "Câu nào có dấu câu đúng?",
                        answers: ["Bạn có khỏe không?", "Bạn có khỏe không.", "Bạn có khỏe không!", "Bạn có khỏe không;"],
                        correct: 0
                    },
                    {
                        question: "Từ loại của 'chạy' là gì?",
                        answers: ["Động từ", "Danh từ", "Tính từ", "Trạng từ"],
                        correct: 0
                    },
                    {
                        question: "Thành ngữ 'Có chí thì nên' có nghĩa gì?",
                        answers: ["Có quyết tâm thì thành công", "Có tiền thì mua được", "Có học thì biết", "Có làm thì có ăn"],
                        correct: 0
                    },
                    {
                        question: "Từ ghép nào đúng?",
                        answers: ["Nhà trường", "Nhà truờng", "Nhà trườg", "Nhà trường"],
                        correct: 0
                    },
                    {
                        question: "Chủ ngữ trong câu 'Em đi học' là gì?",
                        answers: ["Em", "Đi", "Học", "Đi học"],
                        correct: 0
                    },
                    {
                        question: "Từ loại của 'nhanh' là gì?",
                        answers: ["Tính từ", "Động từ", "Danh từ", "Trạng từ"],
                        correct: 0
                    },
                    {
                        question: "Câu cảm thán nào đúng?",
                        answers: ["Trời ơi!", "Trời ơi.", "Trời ơi?", "Trời ơi;"],
                        correct: 0
                    },
                    {
                        question: "Vị ngữ trong câu 'Bé ăn cơm' là gì?",
                        answers: ["Ăn cơm", "Bé", "Ăn", "Cơm"],
                        correct: 0
                    },
                    {
                        question: "Từ nào thuộc loại đại từ?",
                        answers: ["Tôi", "Chạy", "Đẹp", "Nhanh"],
                        correct: 0
                    },
                    {
                        question: "Thành ngữ 'Không có gì quý hơn độc lập tự do' của ai?",
                        answers: ["Hồ Chí Minh", "Trần Hưng Đạo", "Lý Thái Tổ", "Nguyễn Trãi"],
                        correct: 0
                    },
                    {
                        question: "Câu khẳng định nào đúng?",
                        answers: ["Hôm nay em đi học.", "Hôm nay em đi học?", "Hôm nay em đi học!", "Hôm nay em đi học;"],
                        correct: 0
                    },
                    {
                        question: "Từ nào là danh từ?",
                        answers: ["Sách", "Đọc", "Hay", "Chăm"],
                        correct: 0
                    },
                    {
                        question: "Câu phủ định nào đúng?",
                        answers: ["Em không đi chơi", "Em ko đi chơi", "Em không ko đi chơi", "Em đi không chơi"],
                        correct: 0
                    },
                    {
                        question: "Từ loại của 'nói' là gì?",
                        answers: ["Động từ", "Danh từ", "Tính từ", "Trạng từ"],
                        correct: 0
                    },
                    {
                        question: "Thành ngữ 'Một cây làm chẳng nên non' có nghĩa gì?",
                        answers: ["Cần có sự đoàn kết", "Cây phải nhiều mới tốt", "Làm việc một mình khó khăn", "Núi cao cần nhiều cây"],
                        correct: 0
                    },
                    {
                        question: "Từ nào viết đúng chính tả?",
                        answers: ["Chiến thắng", "Chiến thắg", "Chiến thằng", "Chiến thẳng"],
                        correct: 0
                    },
                    {
                        question: "Câu hỏi nào có dấu câu đúng?",
                        answers: ["Bạn tên gì?", "Bạn tên gì.", "Bạn tên gì!", "Bạn tên gì;"],
                        correct: 0
                    },
                    {
                        question: "Từ nào là tính từ?",
                        answers: ["Thông minh", "Học", "Viết", "Đọc"],
                        correct: 0
                    },
                    {
                        question: "Câu nào đúng ngữ pháp?",
                        answers: ["Chúng em rất vui", "Chúng em rất vui.", "Chúng em rất vuii", "Chúng em rất vùi"],
                        correct: 0
                    },                    {
                        question: "Từ loại của 'ở' là gì?",
                        answers: ["Động từ", "Danh từ", "Tính từ", "Giới từ"],
                        correct: 0
                    },
                    {
                        question: "Từ nào có nghĩa 'người dạy học'?",
                        answers: ["Thầy cô", "Bác sĩ", "Kỹ sư", "Nông dân"],
                        correct: 0
                    },
                    {
                        question: "Câu nào có từ láy?",
                        answers: ["Mưa rào rào", "Mưa to", "Mưa nhỏ", "Mưa nhiều"],
                        correct: 0
                    },
                    {
                        question: "Từ nào thuộc về cơ thể?",
                        answers: ["Chân tay", "Bàn ghế", "Cây cỏ", "Núi đồi"],
                        correct: 0
                    },
                    {
                        question: "Câu nào dùng đúng dấu câu?",
                        answers: ["Em học bài.", "Em học bài?", "Em học bài!", "Em học bài;"],
                        correct: 0
                    },
                    {
                        question: "Từ nào có nghĩa tích cực?",
                        answers: ["Tốt bụng", "Xấu tính", "Lười biếng", "Ích kỷ"],
                        correct: 0
                    },
                    {
                        question: "Từ loại của 'nhanh' là gì?",
                        answers: ["Tính từ", "Động từ", "Danh từ", "Trạng từ"],
                        correct: 0
                    },
                    {
                        question: "Từ nào chỉ màu sắc?",
                        answers: ["Vàng", "Tròn", "To", "Cứng"],
                        correct: 0
                    },
                    {
                        question: "Câu nào là câu hỏi?",
                        answers: ["Bạn có khỏe không?", "Bạn rất khỏe.", "Bạn khỏe quá!", "Bạn khỏe rồi."],
                        correct: 0
                    },
                    {
                        question: "Từ nào viết đúng?",
                        answers: ["Trường học", "Trường hóc", "Trường họk", "Trường hok"],
                        correct: 0
                    }
                ],hard: [
                    {
                        question: "Nghĩa của thành ngữ 'Nước đến chân mới nhảy' là gì?",
                        answers: ["Chờ đến lúc khẩn cấp mới hành động", "Sợ nước", "Nhảy cao", "Chạy nhanh"],
                        correct: 0
                    },
                    {
                        question: "Phép tu từ nào được dùng trong 'Mặt trời cười'?",
                        answers: ["Nhân hóa", "So sánh", "Ẩn dụ", "Hoán dụ"],
                        correct: 0
                    },
                    {
                        question: "Từ 'học sinh giỏi' có mấy từ?",
                        answers: ["3", "2", "4", "1"],
                        correct: 0
                    },
                    {
                        question: "Thể thơ lục bát có mấy câu trong một khổ?",
                        answers: ["2", "4", "6", "8"],
                        correct: 0
                    },
                    {
                        question: "Từ 'quê hương' thuộc từ loại nào?",
                        answers: ["Danh từ", "Động từ", "Tính từ", "Trạng từ"],
                        correct: 0
                    },
                    {
                        question: "Thành ngữ 'Uống nước nhớ nguồn' có nghĩa gì?",
                        answers: ["Biết ơn người có công", "Nhớ nơi lấy nước", "Tiết kiệm nước", "Bảo vệ môi trường"],
                        correct: 0
                    },
                    {
                        question: "Phép tu từ nào trong 'Nhanh như chớp'?",
                        answers: ["So sánh", "Nhân hóa", "Ẩn dụ", "Hoán dụ"],
                        correct: 0
                    },
                    {
                        question: "Câu 'Ai mà chẳng yêu quê hương mình' là thể loại gì?",
                        answers: ["Câu hỏi tu từ", "Câu hỏi thông thường", "Câu cảm thán", "Câu khẳng định"],
                        correct: 0
                    },
                    {
                        question: "Từ 'hiền lành' thuộc loại từ gì?",
                        answers: ["Từ ghép", "Từ đơn", "Từ láy", "Từ phức"],
                        correct: 0
                    },
                    {
                        question: "Trong thơ Đường luật, một bài có mấy câu?",
                        answers: ["8", "4", "6", "10"],
                        correct: 0
                    },
                    {
                        question: "Thành ngữ 'Gần mực thì đen, gần đèn thì sáng' có nghĩa gì?",
                        answers: ["Gần ai thì giống người đó", "Ở gần đèn sẽ sáng", "Mực làm đen tay", "Nên ở gần đèn"],
                        correct: 0
                    },
                    {
                        question: "Từ 'chăm chỉ' có mấy âm tiết?",
                        answers: ["2", "3", "1", "4"],
                        correct: 0
                    },
                    {
                        question: "Phép tu từ nào trong 'Hoa như ngọc như hoa'?",
                        answers: ["So sánh", "Nhân hóa", "Ẩn dụ", "Hoán dụ"],
                        correct: 0
                    },
                    {
                        question: "Từ 'xanh rì' thuộc loại từ gì?",
                        answers: ["Từ láy", "Từ ghép", "Từ đơn", "Từ phức"],
                        correct: 0
                    },
                    {
                        question: "Câu 'Mặt trời mọc ở hướng đông' là câu gì?",
                        answers: ["Câu đơn", "Câu ghép", "Câu phức", "Câu rút gọn"],
                        correct: 0
                    },
                    {
                        question: "Thành ngữ 'Tiền rơi từ trên trời xuống' có nghĩa gì?",
                        answers: ["Điều không thể có", "May mắn bất ngờ", "Trời mưa tiền", "Kiếm tiền dễ dàng"],
                        correct: 0
                    },
                    {
                        question: "Từ 'giáo viên' có mấy morpheme?",
                        answers: ["2", "1", "3", "4"],
                        correct: 0
                    },
                    {
                        question: "Loại câu 'Trời hôm nay đẹp quá!' là gì?",
                        answers: ["Câu cảm thán", "Câu hỏi", "Câu khẳng định", "Câu phủ định"],
                        correct: 0
                    },
                    {
                        question: "Từ 'ra-đi-ô' được tạo thành theo cách nào?",
                        answers: ["Vay mượn", "Từ ghép", "Từ láy", "Từ phái sinh"],
                        correct: 0
                    },                    {
                        question: "Thành ngữ 'Cóc có cần gì đến nước lã' có nghĩa gì?",
                        answers: ["Không quan tâm đến điều dễ dàng", "Cóc không uống nước", "Thích uống nước ngọt", "Không cần nước để sống"],
                        correct: 0
                    },
                    {
                        question: "Từ 'xa xôi' thuộc loại từ gì?",
                        answers: ["Từ láy", "Từ ghép", "Từ đơn", "Từ phức"],
                        correct: 0
                    },
                    {
                        question: "Phép tu từ nào trong 'Núi cao như chọc trời'?",
                        answers: ["So sánh", "Nhân hóa", "Ẩn dụ", "Hoán dụ"],
                        correct: 0
                    },
                    {
                        question: "Từ 'học hành' có mấy âm tiết?",
                        answers: ["2", "3", "1", "4"],
                        correct: 0
                    },
                    {
                        question: "Thành ngữ 'Học thầy không tày học bạn' có nghĩa gì?",
                        answers: ["Học hỏi từ bạn bè cũng quan trọng", "Chỉ học từ thầy", "Không nên học bạn", "Thầy dạy không tốt"],
                        correct: 0
                    },
                    {
                        question: "Câu 'Hôm nay trời đẹp' có mấy từ?",
                        answers: ["4", "3", "5", "2"],
                        correct: 0
                    },
                    {
                        question: "Từ 'cười ha ha' thuộc loại từ gì?",
                        answers: ["Từ láy", "Từ ghép", "Từ đơn", "Từ phức"],
                        correct: 0
                    },
                    {
                        question: "Thành ngữ 'Đi một ngày đàng học một sàng khôn' có nghĩa gì?",
                        answers: ["Trải nghiệm giúp ta học được nhiều điều", "Đi xa mới khôn", "Học một ngày là đủ", "Đàng xa khó đi"],
                        correct: 0
                    },
                    {
                        question: "Phép tu từ nào trong 'Lá vàng rơi như cánh bướm'?",
                        answers: ["So sánh", "Nhân hóa", "Ẩn dụ", "Hoán dụ"],
                        correct: 0
                    },
                    {
                        question: "Từ 'đỏ au' thuộc loại từ gì?",
                        answers: ["Từ láy", "Từ ghép", "Từ đơn", "Từ phức"],
                        correct: 0
                    }
                ]
            },            english: {
                easy: [
                    {
                        question: "What color is the sun?",
                        answers: ["Yellow", "Blue", "Red", "Green"],
                        correct: 0
                    },
                    {
                        question: "How do you say 'xin chào' in English?",
                        answers: ["Hello", "Goodbye", "Thank you", "Sorry"],
                        correct: 0
                    },
                    {
                        question: "What is 'con mèo' in English?",
                        answers: ["Cat", "Dog", "Bird", "Fish"],
                        correct: 0
                    },
                    {
                        question: "Complete: I __ a student",
                        answers: ["am", "is", "are", "be"],
                        correct: 0
                    },
                    {
                        question: "What comes after 'A'?",
                        answers: ["B", "C", "D", "E"],
                        correct: 0
                    },
                    {
                        question: "What is 'con chó' in English?",
                        answers: ["Dog", "Cat", "Bird", "Fish"],
                        correct: 0
                    },
                    {
                        question: "How do you say 'cảm ơn' in English?",
                        answers: ["Thank you", "Hello", "Goodbye", "Sorry"],
                        correct: 0
                    },
                    {
                        question: "What is 'màu đỏ' in English?",
                        answers: ["Red", "Blue", "Green", "Yellow"],
                        correct: 0
                    },
                    {
                        question: "Complete: She __ a teacher",
                        answers: ["is", "am", "are", "be"],
                        correct: 0
                    },
                    {
                        question: "What number comes after 'one'?",
                        answers: ["Two", "Three", "Four", "Five"],
                        correct: 0
                    },
                    {
                        question: "What is 'con cá' in English?",
                        answers: ["Fish", "Cat", "Dog", "Bird"],
                        correct: 0
                    },
                    {
                        question: "How do you say 'tạm biệt' in English?",
                        answers: ["Goodbye", "Hello", "Thank you", "Sorry"],
                        correct: 0
                    },
                    {
                        question: "What is 'màu xanh' in English?",
                        answers: ["Blue", "Red", "Yellow", "Green"],
                        correct: 0
                    },
                    {
                        question: "Complete: They __ students",
                        answers: ["are", "is", "am", "be"],
                        correct: 0
                    },
                    {
                        question: "What day comes after Monday?",
                        answers: ["Tuesday", "Wednesday", "Thursday", "Friday"],
                        correct: 0
                    },
                    {
                        question: "What is 'nhà' in English?",
                        answers: ["House", "Car", "Book", "Pen"],
                        correct: 0
                    },
                    {
                        question: "How do you say 'xin lỗi' in English?",
                        answers: ["Sorry", "Hello", "Thank you", "Goodbye"],
                        correct: 0
                    },
                    {
                        question: "What is the opposite of 'big'?",
                        answers: ["Small", "Tall", "Short", "Long"],
                        correct: 0
                    },                    {
                        question: "Complete: We __ happy",
                        answers: ["are", "is", "am", "be"],
                        correct: 0
                    },
                    {
                        question: "What is 'quyển sách' in English?",
                        answers: ["Book", "Pen", "Table", "Chair"],
                        correct: 0
                    },
                    {
                        question: "How do you say 'một' in English?",
                        answers: ["One", "Two", "Three", "Four"],
                        correct: 0
                    },
                    {
                        question: "What color is the grass?",
                        answers: ["Green", "Blue", "Red", "Yellow"],
                        correct: 0
                    },
                    {
                        question: "Complete: I __ hungry",
                        answers: ["am", "is", "are", "be"],
                        correct: 0
                    },
                    {
                        question: "What is 'con voi' in English?",
                        answers: ["Elephant", "Cat", "Dog", "Bird"],
                        correct: 0
                    },
                    {
                        question: "How do you say 'không' in English?",
                        answers: ["No", "Yes", "Maybe", "Always"],
                        correct: 0
                    },
                    {
                        question: "What is 'mặt trời' in English?",
                        answers: ["Sun", "Moon", "Star", "Cloud"],
                        correct: 0
                    },
                    {
                        question: "Complete: You __ my friend",
                        answers: ["are", "is", "am", "be"],
                        correct: 0
                    },
                    {
                        question: "What is 'màu tím' in English?",
                        answers: ["Purple", "Pink", "Orange", "Brown"],
                        correct: 0
                    }
                ],medium: [
                    {
                        question: "Choose the correct sentence:",
                        answers: ["She goes to school", "She go to school", "She going to school", "She goed to school"],
                        correct: 0
                    },
                    {
                        question: "What is the past tense of 'eat'?",
                        answers: ["Ate", "Eated", "Eating", "Eats"],
                        correct: 0
                    },
                    {
                        question: "Which is a noun?",
                        answers: ["Book", "Run", "Quick", "Slowly"],
                        correct: 0
                    },
                    {
                        question: "Choose the plural of 'child':",
                        answers: ["Children", "Childs", "Childes", "Childrens"],
                        correct: 0
                    },
                    {
                        question: "What does 'beautiful' mean?",
                        answers: ["Đẹp", "Xấu", "To", "Nhỏ"],
                        correct: 0
                    },
                    {
                        question: "What is the past tense of 'go'?",
                        answers: ["Went", "Goed", "Going", "Goes"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: 'I __ to school yesterday'",
                        answers: ["Went", "Go", "Going", "Goes"],
                        correct: 0
                    },
                    {
                        question: "Which is an adjective?",
                        answers: ["Happy", "Run", "Quickly", "Jump"],
                        correct: 0
                    },
                    {
                        question: "What is the plural of 'mouse'?",
                        answers: ["Mice", "Mouses", "Mouse", "Mices"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct sentence:",
                        answers: ["He doesn't like apples", "He don't like apples", "He not like apples", "He no like apples"],
                        correct: 0
                    },
                    {
                        question: "What is the past tense of 'see'?",
                        answers: ["Saw", "Seed", "Seeing", "Sees"],
                        correct: 0
                    },
                    {
                        question: "Which word means 'nhanh'?",
                        answers: ["Fast", "Slow", "Big", "Small"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: 'She __ a book now'",
                        answers: ["Is reading", "Read", "Reads", "Reading"],
                        correct: 0
                    },
                    {
                        question: "What is the opposite of 'hot'?",
                        answers: ["Cold", "Warm", "Cool", "Fire"],
                        correct: 0
                    },
                    {
                        question: "Which is a verb?",
                        answers: ["Play", "Ball", "Happy", "Quickly"],
                        correct: 0
                    },
                    {
                        question: "What does 'intelligent' mean?",
                        answers: ["Thông minh", "Đẹp", "To", "Nhanh"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: 'They __ playing football'",
                        answers: ["Are", "Is", "Am", "Be"],
                        correct: 0
                    },
                    {
                        question: "What is the plural of 'foot'?",
                        answers: ["Feet", "Foots", "Foot", "Feets"],
                        correct: 0
                    },
                    {
                        question: "Which word is an adverb?",
                        answers: ["Carefully", "Care", "Careful", "Careless"],
                        correct: 0
                    },                    {
                        question: "What is the past tense of 'come'?",
                        answers: ["Came", "Comed", "Coming", "Comes"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct preposition: 'The book is __ the table'",
                        answers: ["on", "in", "at", "by"],
                        correct: 0
                    },
                    {
                        question: "What does 'expensive' mean?",
                        answers: ["Đắt", "Rẻ", "Miễn phí", "Cũ"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: 'There __ many books'",
                        answers: ["are", "is", "am", "be"],
                        correct: 0
                    },
                    {
                        question: "What is the opposite of 'young'?",
                        answers: ["Old", "New", "Fresh", "Small"],
                        correct: 0
                    },
                    {
                        question: "Complete: 'Can you __ me?'",
                        answers: ["help", "helps", "helping", "helped"],
                        correct: 0
                    },
                    {
                        question: "What is 'phòng ngủ' in English?",
                        answers: ["Bedroom", "Kitchen", "Bathroom", "Living room"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: 'She __ every day'",
                        answers: ["studies", "study", "studying", "studied"],
                        correct: 0
                    },
                    {
                        question: "What does 'difficult' mean?",
                        answers: ["Khó", "Dễ", "Đơn giản", "Nhanh"],
                        correct: 0
                    },
                    {
                        question: "What is the plural of 'box'?",
                        answers: ["Boxes", "Boxs", "Box", "Boxies"],
                        correct: 0
                    }
                ],
                    {
                        question: "Choose the correct conditional sentence:",
                        answers: ["If I were you, I would study harder", "If I was you, I will study harder", "If I am you, I would study harder", "If I be you, I would study harder"],
                        correct: 0
                    },
                    {
                        question: "What is the synonym of 'enormous'?",
                        answers: ["Huge", "Tiny", "Medium", "Small"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct passive voice:",
                        answers: ["The book was written by him", "The book is write by him", "The book written by him", "The book writing by him"],
                        correct: 0
                    },
                    {
                        question: "What type of word is 'quickly'?",
                        answers: ["Adverb", "Noun", "Verb", "Adjective"],
                        correct: 0
                    },
                    {
                        question: "Complete: I wish I __ taller",
                        answers: ["Were", "Was", "Am", "Is"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct reported speech: He said, 'I am happy'",
                        answers: ["He said that he was happy", "He said that he is happy", "He said that I am happy", "He said that I was happy"],
                        correct: 0
                    },
                    {
                        question: "What is the antonym of 'ancient'?",
                        answers: ["Modern", "Old", "Historical", "Traditional"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: 'She __ here for five years'",
                        answers: ["Has lived", "Have lived", "Is living", "Lives"],
                        correct: 0
                    },
                    {
                        question: "What type of clause is 'when he arrived'?",
                        answers: ["Adverbial clause", "Noun clause", "Adjective clause", "Independent clause"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: 'By next year, I __ graduated'",
                        answers: ["Will have", "Will", "Have", "Had"],
                        correct: 0
                    },
                    {
                        question: "What is the meaning of the idiom 'break the ice'?",
                        answers: ["Start a conversation", "Break something cold", "Cool down", "Stop talking"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct subjunctive: 'If I __ rich, I would travel'",
                        answers: ["Were", "Was", "Am", "Will be"],
                        correct: 0
                    },
                    {
                        question: "What is the comparative form of 'good'?",
                        answers: ["Better", "Gooder", "More good", "Best"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: 'I'd rather you __ here'",
                        answers: ["Stayed", "Stay", "Staying", "To stay"],
                        correct: 0
                    },
                    {
                        question: "What type of sentence is: 'Although it was raining, we went out'?",
                        answers: ["Complex", "Simple", "Compound", "Fragment"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: 'I suggest that he __ early'",
                        answers: ["Leave", "Leaves", "Left", "Leaving"],
                        correct: 0
                    },
                    {
                        question: "What does 'ubiquitous' mean?",
                        answers: ["Present everywhere", "Very rare", "Expensive", "Beautiful"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct inversion: 'Never __ such a beautiful sunset'",
                        answers: ["Have I seen", "I have seen", "I saw", "Did I saw"],
                        correct: 0
                    },
                    {
                        question: "What is the gerund in: 'Swimming is fun'?",
                        answers: ["Swimming", "Is", "Fun", "No gerund"],
                        correct: 0
                    },
                    {
                        question: "Choose the correct form: '__ you mind opening the window?'",
                        answers: ["Would", "Will", "Can", "Should"],
                        correct: 0
                    }
                ]
            },            science: {
                easy: [
                    {
                        question: "Mặt trời thuộc hệ gì?",
                        answers: ["Hệ mặt trời", "Hệ thiên hà", "Hệ vũ trụ", "Hệ hành tinh"],
                        correct: 0
                    },
                    {
                        question: "Động vật nào sống dưới nước?",
                        answers: ["Cá", "Chó", "Mèo", "Chim"],
                        correct: 0
                    },
                    {
                        question: "Cây cần gì để sống?",
                        answers: ["Ánh sáng và nước", "Chỉ nước", "Chỉ ánh sáng", "Không cần gì"],
                        correct: 0
                    },
                    {
                        question: "Chúng ta thở cái gì?",
                        answers: ["Không khí", "Nước", "Đất", "Lửa"],
                        correct: 0
                    },
                    {
                        question: "Trái đất có mấy mùa trong năm?",
                        answers: ["4", "2", "3", "5"],
                        correct: 0
                    },
                    {
                        question: "Động vật nào bay được?",
                        answers: ["Chim", "Cá", "Lợn", "Bò"],
                        correct: 0
                    },
                    {
                        question: "Mưa được tạo thành từ đâu?",
                        answers: ["Nước bốc hơi", "Không khí", "Đất", "Lửa"],
                        correct: 0
                    },
                    {
                        question: "Cơ quan nào giúp chúng ta nhìn?",
                        answers: ["Mắt", "Tai", "Mũi", "Miệng"],
                        correct: 0
                    },
                    {
                        question: "Hành tinh nào chúng ta đang sống?",
                        answers: ["Trái đất", "Mặt trăng", "Mặt trời", "Sao hỏa"],
                        correct: 0
                    },
                    {
                        question: "Cơ quan nào giúp chúng ta nghe?",
                        answers: ["Tai", "Mắt", "Mũi", "Miệng"],
                        correct: 0
                    },
                    {
                        question: "Loài vật nào cho sữa?",
                        answers: ["Bò", "Gà", "Cá", "Chim"],
                        correct: 0
                    },
                    {
                        question: "Băng là gì?",
                        answers: ["Nước đông lạnh", "Đá cứng", "Kim loại", "Thực vật"],
                        correct: 0
                    },
                    {
                        question: "Cơ quan nào giúp chúng ta ngửi?",
                        answers: ["Mũi", "Mắt", "Tai", "Miệng"],
                        correct: 0
                    },
                    {
                        question: "Loài thực vật nào ra hoa?",
                        answers: ["Hoa hồng", "Cỏ", "Rêu", "Nấm"],
                        correct: 0
                    },
                    {
                        question: "Cơ quan nào bơm máu?",
                        answers: ["Tim", "Phổi", "Gan", "Thận"],
                        correct: 0
                    },
                    {
                        question: "Động vật nào đẻ trứng?",
                        answers: ["Gà", "Bò", "Lợn", "Chó"],
                        correct: 0
                    },
                    {
                        question: "Chất nào cháy được?",
                        answers: ["Giấy", "Nước", "Đá", "Sắt"],
                        correct: 0
                    },
                    {
                        question: "Màu gì tạo thành khi trộn đỏ và vàng?",
                        answers: ["Cam", "Xanh", "Tím", "Đen"],
                        correct: 0
                    },
                    {
                        question: "Loài vật nào có vảy?",
                        answers: ["Cá", "Chó", "Mèo", "Chim"],
                        correct: 0
                    },
                    {
                        question: "Gì làm cho cây xanh?",
                        answers: ["Diệp lục tố", "Nước", "Ánh sáng", "Đất"],
                        correct: 0
                    }
                ],                medium: [
                    {
                        question: "Công thức của nước là gì?",
                        answers: ["H2O", "CO2", "O2", "H2SO4"],
                        correct: 0
                    },
                    {
                        question: "Quá trình nào tạo ra oxy?",
                        answers: ["Quang hợp", "Hô hấp", "Tiêu hóa", "Tuần hoàn"],
                        correct: 0
                    },
                    {
                        question: "Hành tinh nào gần Mặt trời nhất?",
                        answers: ["Sao Thủy", "Sao Kim", "Trái Đất", "Sao Hỏa"],
                        correct: 0
                    },
                    {
                        question: "Kim loại nào dẫn điện tốt nhất?",
                        answers: ["Bạc", "Đồng", "Sắt", "Nhôm"],
                        correct: 0
                    },
                    {
                        question: "Cơ quan nào lọc máu trong cơ thể?",
                        answers: ["Thận", "Gan", "Phổi", "Tim"],
                        correct: 0
                    },
                    {
                        question: "Khí nào chiếm nhiều nhất trong không khí?",
                        answers: ["Nitơ", "Oxy", "CO2", "Hidro"],
                        correct: 0
                    },
                    {
                        question: "Động vật nào là động vật có vú?",
                        answers: ["Cá voi", "Cá mập", "Cá heo", "Tất cả đều đúng"],
                        correct: 3
                    },
                    {
                        question: "Quy trình nào tạo ra mưa?",
                        answers: ["Chu trình nước", "Quang hợp", "Hô hấp", "Tuần hoàn máu"],
                        correct: 0
                    },
                    {
                        question: "Hành tinh nào lớn nhất trong hệ mặt trời?",
                        answers: ["Sao Mộc", "Sao Thổ", "Trái Đất", "Sao Hỏa"],
                        correct: 0
                    },
                    {
                        question: "Cơ quan nào sản xuất insulin?",
                        answers: ["Tuyến tụy", "Gan", "Thận", "Tim"],
                        correct: 0
                    },
                    {
                        question: "Loài động vật nào biến nhiệt?",
                        answers: ["Rắn", "Chó", "Mèo", "Chim"],
                        correct: 0
                    },
                    {
                        question: "Âm thanh truyền qua môi trường nào nhanh nhất?",
                        answers: ["Chất rắn", "Chất lỏng", "Chất khí", "Chân không"],
                        correct: 0
                    },
                    {
                        question: "Vitamin nào được tổng hợp dưới ánh nắng mặt trời?",
                        answers: ["Vitamin D", "Vitamin A", "Vitamin C", "Vitamin B"],
                        correct: 0
                    },
                    {
                        question: "Nguyên tố nào có ký hiệu O?",
                        answers: ["Oxy", "Vàng", "Bạc", "Sắt"],
                        correct: 0
                    },
                    {
                        question: "Loài thực vật nào hút côn trùng?",
                        answers: ["Cây nắp ấm", "Cây thông", "Cây lúa", "Cây cam"],
                        correct: 0
                    },
                    {
                        question: "Hiện tượng nào tạo cầu vồng?",
                        answers: ["Khúc xạ ánh sáng", "Phản xạ ánh sáng", "Hấp thụ ánh sáng", "Tán xạ ánh sáng"],
                        correct: 0
                    },
                    {
                        question: "Cơ quan nào tiết ra mật?",
                        answers: ["Gan", "Thận", "Phổi", "Tim"],
                        correct: 0
                    },
                    {
                        question: "Loài vật nào không có xương sống?",
                        answers: ["Giun", "Cá", "Chim", "Ếch"],
                        correct: 0
                    },
                    {
                        question: "Hiện tượng nào xảy ra khi nước sôi?",
                        answers: ["Bốc hơi", "Đông đặc", "Nóng chảy", "Thăng hoa"],
                        correct: 0
                    },
                    {
                        question: "Bộ phận nào của cây hấp thụ nước?",
                        answers: ["Rễ", "Thân", "Lá", "Hoa"],
                        correct: 0
                    }
                ],                hard: [
                    {
                        question: "Định luật nào của Newton nói về quán tính?",
                        answers: ["Định luật I", "Định luật II", "Định luật III", "Không có định luật nào"],
                        correct: 0
                    },
                    {
                        question: "Nguyên tố có ký hiệu Au là gì?",
                        answers: ["Vàng", "Bạc", "Đồng", "Sắt"],
                        correct: 0
                    },
                    {
                        question: "Tốc độ ánh sáng trong chân không là:",
                        answers: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
                        correct: 0
                    },
                    {
                        question: "DNA viết tắt của từ gì?",
                        answers: ["Deoxyribonucleic Acid", "Deoxyribose Acid", "Deoxygenated Acid", "Dehydrated Acid"],
                        correct: 0
                    },
                    {
                        question: "Nguyên tử có mấy loại hạt cơ bản?",
                        answers: ["3", "2", "4", "5"],
                        correct: 0
                    },
                    {
                        question: "Công thức tính năng lượng của Einstein là gì?",
                        answers: ["E=mc²", "E=mv²", "E=ma", "E=mgh"],
                        correct: 0
                    },
                    {
                        question: "Hợp chất nào có công thức NaCl?",
                        answers: ["Muối ăn", "Đường", "Axit", "Bazơ"],
                        correct: 0
                    },
                    {
                        question: "Hiện tượng gì xảy ra ở nhiệt độ tuyệt đối?",
                        answers: ["Mọi chuyển động nguyên tử dừng lại", "Nước đông lại", "Kim loại nóng chảy", "Không khí hóa lỏng"],
                        correct: 0
                    },
                    {
                        question: "Bảng tuần hoàn được sắp xếp theo thứ tự gì?",
                        answers: ["Số nguyên tử", "Khối lượng nguyên tử", "Số neutron", "Số electron"],
                        correct: 0
                    },
                    {
                        question: "Loại sóng nào có tần số cao nhất?",
                        answers: ["Tia gamma", "Tia X", "Ánh sáng nhìn thấy", "Sóng radio"],
                        correct: 0
                    },
                    {
                        question: "Quá trình nào biến glucose thành ATP?",
                        answers: ["Hô hấp tế bào", "Quang hợp", "Tiêu hóa", "Thải trừ"],
                        correct: 0
                    },
                    {
                        question: "Hạt nào mang điện tích âm?",
                        answers: ["Electron", "Proton", "Neutron", "Positron"],
                        correct: 0
                    },
                    {
                        question: "Định luật nào bảo toàn khối lượng?",
                        answers: ["Định luật Lavoisier", "Định luật Newton", "Định luật Mendel", "Định luật Ohm"],
                        correct: 0
                    },
                    {
                        question: "Enzyme nào phân giải tinh bột?",
                        answers: ["Amylase", "Pepsin", "Lipase", "Catalase"],
                        correct: 0
                    },
                    {
                        question: "Hiện tượng nào làm biến dạng không-thời gian?",
                        answers: ["Hấp dẫn", "Điện từ", "Hạt nhân yếu", "Hạt nhân mạnh"],
                        correct: 0
                    },
                    {
                        question: "Quá trình nào tạo ra năng lượng mặt trời?",
                        answers: ["Phản ứng tổng hợp hạt nhân", "Phản ứng phân hạch", "Đốt cháy", "Hóa học"],
                        correct: 0
                    },
                    {
                        question: "Phân tử nào mang thông tin di truyền?",
                        answers: ["DNA", "RNA", "Protein", "Lipid"],
                        correct: 0
                    },
                    {
                        question: "Lực nào yếu nhất trong 4 lực cơ bản?",
                        answers: ["Hấp dẫn", "Điện từ", "Hạt nhân mạnh", "Hạt nhân yếu"],
                        correct: 0
                    },
                    {
                        question: "Số Avogadro có giá trị bao nhiêu?",
                        answers: ["6.022 × 10²³", "3.14 × 10⁸", "9.8 × 10¹⁰", "1.6 × 10⁻¹⁹"],
                        correct: 0
                    },
                    {
                        question: "Quá trình nào tạo ra ozone trong tầng bình lưu?",
                        answers: ["Phân ly O2 bởi tia UV", "Đốt cháy", "Quang hợp", "Hô hấp"],
                        correct: 0
                    }
                ]
            }
        };
    }

    getQuestions(subject, difficulty, count = 10) {
        const subjectQuestions = this.questions[subject]?.[difficulty] || [];
        const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }
}

class EducationalGame {
    constructor() {
        this.gameState = new GameState();
        this.questionDB = new QuestionDatabase();
        this.memoryGame = new MemoryGame(this);
        this.puzzleGame = new PuzzleGame(this);
        this.typingGame = new TypingGame(this);
        this.soundManager = null;
        this.currentScreen = 'mainMenuScreen';
        this.init();
    }    init() {
        this.showLoadingScreen();
        this.initializeSoundManager();
        this.setupEventListeners();
        this.memoryGame.setupMemoryGame();
        this.puzzleGame.setupPuzzleGame();
        this.typingGame.setupTypingGame();
        this.createParticleEffect();
        this.loadSettings();
        
        // Hide loading screen after initialization
        setTimeout(() => {
            this.hideLoadingScreen();
            this.showScreen('mainMenuScreen');
        }, 2000);
    }    async initializeSoundManager() {
        try {
            if (typeof SoundManager !== 'undefined') {
                this.soundManager = new SoundManager();
                await this.soundManager.loadAllSounds();
                
                // Start background music if settings allow
                if (this.gameState.settings.backgroundMusic) {
                    // Delay to ensure user interaction has occurred
                    setTimeout(() => {
                        this.soundManager.startBackgroundMusic();
                    }, 3000);
                }
                
                // Update sound toggle UI
                this.soundManager.updateSoundToggleUI();
            }
        } catch (error) {
            console.warn('Sound Manager initialization failed:', error);
        }
    }

    playSound(soundName, options = {}) {
        if (this.soundManager && this.gameState.settings.soundEffects) {
            this.soundManager.play(soundName, options);
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.getElementById('loadingProgressBar');
        
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            
            // Animate progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            }, 100);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    setupEventListeners() {
        // Game mode selection
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.dataset.mode;
                this.selectGameMode(mode);
            });
        });

        // Quiz setup navigation
        const backToMainFromQuiz = document.getElementById('backToMainFromQuiz');
        if (backToMainFromQuiz) {
            backToMainFromQuiz.addEventListener('click', () => {
                this.showScreen('mainMenuScreen');
            });
        }

        // Subject selection
        document.querySelectorAll('.subject-card').forEach(card => {
            card.addEventListener('click', () => {
                // Remove previous selections
                document.querySelectorAll('.subject-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.gameState.currentSubject = card.dataset.subject;
                this.updateStartButton();
            });
        });

        // Level selection
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.gameState.currentLevel = parseInt(btn.dataset.level);
                this.updateStartButton();
            });
        });

        // Difficulty selection
        document.querySelectorAll('.difficulty-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.gameState.currentDifficulty = card.dataset.difficulty;
                this.updateStartButton();
            });
        });

        // Start quiz button
        const startQuizBtn = document.getElementById('startQuizBtn');
        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                this.startQuiz();
            });
        }

        // Power-ups
        const skipPowerUp = document.getElementById('skipPowerUp');
        if (skipPowerUp) {
            skipPowerUp.addEventListener('click', () => {
                this.useSkipPowerUp();
            });
        }

        const hintPowerUp = document.getElementById('hintPowerUp');
        if (hintPowerUp) {
            hintPowerUp.addEventListener('click', () => {
                this.useHintPowerUp();
            });
        }

        const timePowerUp = document.getElementById('timePowerUp');
        if (timePowerUp) {
            timePowerUp.addEventListener('click', () => {
                this.useTimePowerUp();
            });
        }

        // Pause button
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.pauseGame();
            });
        }

        // Results screen buttons
        const playAgainBtn = document.getElementById('playAgainBtn');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                this.restartQuiz();
            });
        }

        const backToMenuBtn = document.getElementById('backToMenuBtn');
        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', () => {
                this.showScreen('mainMenuScreen');
            });
        }

        // Settings screen
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showScreen('settingsScreen');
            });
        }

        const backToMainFromSettings = document.getElementById('backToMainFromSettings');
        if (backToMainFromSettings) {
            backToMainFromSettings.addEventListener('click', () => {
                this.showScreen('mainMenuScreen');
            });
        }        // Settings controls
        this.setupSettingsControls();        // Sound toggle button
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                if (this.soundManager) {
                    // Enable audio context on user interaction
                    this.soundManager.enableAudioContext();
                    
                    const soundEnabled = this.soundManager.toggleSound();
                    const musicEnabled = this.soundManager.toggleBackgroundMusic();
                    
                    // Update game state settings
                    this.gameState.settings.soundEffects = soundEnabled;
                    this.gameState.settings.backgroundMusic = musicEnabled;
                    this.saveSettings();
                    
                    // Show notification
                    const message = (soundEnabled && musicEnabled) ? 'Âm thanh đã bật' : 'Âm thanh đã tắt';
                    this.showNotification(message, 'info');
                    
                    // Play a test sound to confirm it's working
                    if (soundEnabled) {
                        this.playSound('click');
                    }
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }    setupSettingsControls() {
        // Sound effects toggle
        const soundEffectsToggle = document.getElementById('soundEffectsToggle');
        if (soundEffectsToggle) {
            soundEffectsToggle.addEventListener('change', (e) => {
                this.gameState.settings.soundEffects = e.target.checked;
                if (this.soundManager) {
                    this.soundManager.soundEnabled = e.target.checked;
                    this.soundManager.updateSoundToggleUI();
                }
                this.saveSettings();
            });
        }

        // Background music toggle
        const backgroundMusicToggle = document.getElementById('backgroundMusicToggle');
        if (backgroundMusicToggle) {
            backgroundMusicToggle.addEventListener('change', (e) => {
                this.gameState.settings.backgroundMusic = e.target.checked;
                if (this.soundManager) {
                    this.soundManager.musicEnabled = e.target.checked;
                    if (e.target.checked) {
                        this.soundManager.startBackgroundMusic();
                    } else {
                        this.soundManager.stopBackgroundMusic();
                    }
                    this.soundManager.updateSoundToggleUI();
                }
                this.saveSettings();
            });
        }

        // Volume slider
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.gameState.settings.volume = parseInt(e.target.value);
                const volumeValue = document.querySelector('.volume-value');
                if (volumeValue) {
                    volumeValue.textContent = `${e.target.value}%`;
                }
                if (this.soundManager) {
                    this.soundManager.setVolume(parseInt(e.target.value) / 100);
                }
                this.saveSettings();
            });
        }
    }selectGameMode(mode) {
        this.gameState.currentMode = mode;
        
        switch (mode) {
            case 'quiz':
                this.showScreen('quizSetupScreen');
                break;
            case 'memory':
                this.showScreen('memorySetupScreen');
                break;
            case 'puzzle':
                this.showScreen('puzzleSetupScreen');
                break;
            case 'typing':
                this.showScreen('typingSetupScreen');
                break;
            default:
                this.showNotification(`Chế độ ${mode} sẽ sớm ra mắt!`, 'info');
        }
    }

    updateStartButton() {
        const startBtn = document.getElementById('startQuizBtn');
        if (startBtn) {
            const canStart = this.gameState.currentSubject && 
                           this.gameState.currentLevel && 
                           this.gameState.currentDifficulty;
            
            startBtn.disabled = !canStart;
            if (canStart) {
                startBtn.classList.add('ready');
            } else {
                startBtn.classList.remove('ready');
            }
        }
    }

    startQuiz() {
        if (!this.gameState.currentSubject || !this.gameState.currentDifficulty) {
            this.showNotification('Vui lòng chọn môn học và độ khó!', 'warning');
            return;
        }

        // Reset game state
        this.gameState.reset();
        
        // Get questions based on difficulty
        let questionCount = 10;
        let timePerQuestion = 45;
        
        switch (this.gameState.currentDifficulty) {
            case 'easy':
                questionCount = 10;
                timePerQuestion = 45;
                break;
            case 'medium':
                questionCount = 15;
                timePerQuestion = 30;
                break;
            case 'hard':
                questionCount = 20;
                timePerQuestion = 20;
                break;
        }

        this.gameState.timeLimit = timePerQuestion;
        this.gameState.questions = this.questionDB.getQuestions(
            this.gameState.currentSubject,
            this.gameState.currentDifficulty,
            questionCount
        );

        if (this.gameState.questions.length === 0) {
            this.showNotification('Không tìm thấy câu hỏi phù hợp!', 'error');
            return;
        }

        this.gameState.isGameActive = true;
        this.showScreen('quizGameScreen');
        this.updateGameUI();
        this.showQuestion();
    }

    showQuestion() {
        if (this.gameState.currentQuestionIndex >= this.gameState.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.gameState.questions[this.gameState.currentQuestionIndex];
        const questionText = document.getElementById('questionText');
        const answersGrid = document.getElementById('answersGrid');

        if (questionText) {
            questionText.textContent = question.question;
        }

        if (answersGrid) {
            answersGrid.innerHTML = '';
            question.answers.forEach((answer, index) => {
                const answerBtn = document.createElement('button');
                answerBtn.className = 'answer-btn';
                answerBtn.textContent = answer;
                answerBtn.addEventListener('click', () => {
                    this.selectAnswer(index);
                });
                answersGrid.appendChild(answerBtn);
            });
        }

        this.gameState.updateProgress();
        this.startTimer();
    }

    selectAnswer(selectedIndex) {
        if (!this.gameState.isGameActive) return;

        this.clearTimer();
        const question = this.gameState.questions[this.gameState.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;

        // Visual feedback
        const answerBtns = document.querySelectorAll('.answer-btn');
        answerBtns[selectedIndex].classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) {
            answerBtns[question.correct].classList.add('correct');
        }

        // Update game state
        if (isCorrect) {
            this.gameState.correctAnswers++;
            this.gameState.updateScore(100);
            this.showNotification('Chính xác! 🎉', 'success');
        } else {
            this.gameState.wrongAnswers++;
            this.gameState.lives--;
            this.gameState.updateLives();
            this.showNotification('Sai rồi! 😅', 'error');
        }

        // Check if game should end
        if (this.gameState.lives <= 0) {
            setTimeout(() => {
                this.endQuiz();
            }, 1500);
            return;
        }

        // Move to next question
        setTimeout(() => {
            this.gameState.currentQuestionIndex++;
            this.showQuestion();
        }, 1500);
    }

    startTimer() {
        const timerText = document.getElementById('timerText');
        const timerProgress = document.getElementById('timerProgress');
        
        let timeLeft = this.gameState.timeLimit;
        
        this.gameState.timer = setInterval(() => {
            timeLeft--;
            
            if (timerText) {
                timerText.textContent = timeLeft;
            }
            
            if (timerProgress) {
                const progressPercentage = (timeLeft / this.gameState.timeLimit) * 100;
                const circumference = 2 * Math.PI * 45;
                const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;
                timerProgress.style.strokeDashoffset = strokeDashoffset;
            }
            
            if (timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    clearTimer() {
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
            this.gameState.timer = null;
        }
    }

    timeUp() {
        this.clearTimer();
        this.gameState.wrongAnswers++;
        this.gameState.lives--;
        this.gameState.updateLives();
        this.showNotification('Hết giờ! ⏰', 'warning');

        // Show correct answer
        const question = this.gameState.questions[this.gameState.currentQuestionIndex];
        const answerBtns = document.querySelectorAll('.answer-btn');
        if (answerBtns[question.correct]) {
            answerBtns[question.correct].classList.add('correct');
        }

        // Check if game should end
        if (this.gameState.lives <= 0) {
            setTimeout(() => {
                this.endQuiz();
            }, 1500);
            return;
        }

        // Move to next question
        setTimeout(() => {
            this.gameState.currentQuestionIndex++;
            this.showQuestion();
        }, 1500);
    }

    useSkipPowerUp() {
        if (this.gameState.powerUps.skip <= 0 || !this.gameState.isGameActive) return;

        this.gameState.powerUps.skip--;
        this.updatePowerUpDisplay();
        this.clearTimer();
        
        this.showNotification('Bỏ qua câu hỏi! ⏭️', 'info');
        
        setTimeout(() => {
            this.gameState.currentQuestionIndex++;
            this.showQuestion();
        }, 1000);
    }

    useHintPowerUp() {
        if (this.gameState.powerUps.hint <= 0 || !this.gameState.isGameActive) return;

        this.gameState.powerUps.hint--;
        this.updatePowerUpDisplay();

        // Remove 2 wrong answers
        const question = this.gameState.questions[this.gameState.currentQuestionIndex];
        const answerBtns = document.querySelectorAll('.answer-btn');
        let removedCount = 0;

        for (let i = 0; i < answerBtns.length && removedCount < 2; i++) {
            if (i !== question.correct) {
                answerBtns[i].style.opacity = '0.3';
                answerBtns[i].style.pointerEvents = 'none';
                removedCount++;
            }
        }

        this.showNotification('Gợi ý 50/50! 💡', 'info');
    }

    useTimePowerUp() {
        if (this.gameState.powerUps.time <= 0 || !this.gameState.isGameActive) return;

        this.gameState.powerUps.time--;
        this.updatePowerUpDisplay();

        // Add 15 seconds to current timer
        const timerText = document.getElementById('timerText');
        if (timerText) {
            const currentTime = parseInt(timerText.textContent);
            const newTime = currentTime + 15;
            timerText.textContent = newTime;
            
            // Restart timer with new time
            this.clearTimer();
            this.gameState.timeLimit = newTime;
            this.startTimer();
        }

        this.showNotification('Thêm 15 giây! ⏰', 'info');
    }

    updatePowerUpDisplay() {
        const skipCount = document.querySelector('#skipPowerUp .power-count');
        const hintCount = document.querySelector('#hintPowerUp .power-count');
        const timeCount = document.querySelector('#timePowerUp .power-count');

        if (skipCount) skipCount.textContent = this.gameState.powerUps.skip;
        if (hintCount) hintCount.textContent = this.gameState.powerUps.hint;
        if (timeCount) timeCount.textContent = this.gameState.powerUps.time;
    }

    pauseGame() {
        if (this.gameState.isGameActive) {
            this.gameState.isGameActive = false;
            this.clearTimer();
            this.showNotification('Game tạm dừng', 'info');
        } else {
            this.gameState.isGameActive = true;
            this.startTimer();
            this.showNotification('Tiếp tục game', 'info');
        }
    }

    endQuiz() {
        this.gameState.isGameActive = false;
        this.clearTimer();
        this.showResults();
    }

    showResults() {
        const totalQuestions = this.gameState.correctAnswers + this.gameState.wrongAnswers;
        const accuracy = totalQuestions > 0 ? Math.round((this.gameState.correctAnswers / totalQuestions) * 100) : 0;
        const totalTime = Math.round((Date.now() - this.gameState.startTime) / 1000);

        // Update results display
        const finalScore = document.getElementById('finalScore');
        const correctCount = document.getElementById('correctCount');
        const wrongCount = document.getElementById('wrongCount');
        const accuracyRate = document.getElementById('accuracyRate');
        const totalTimeDisplay = document.getElementById('totalTime');
        const performanceText = document.getElementById('performanceText');
        const ratingStars = document.getElementById('ratingStars');

        if (finalScore) finalScore.textContent = this.gameState.score;
        if (correctCount) correctCount.textContent = this.gameState.correctAnswers;
        if (wrongCount) wrongCount.textContent = this.gameState.wrongAnswers;
        if (accuracyRate) accuracyRate.textContent = `${accuracy}%`;
        if (totalTimeDisplay) totalTimeDisplay.textContent = `${totalTime}s`;

        // Performance rating
        let rating = 0;
        let performance = '';

        if (accuracy >= 90) {
            rating = 5;
            performance = 'Xuất sắc! 🌟';
        } else if (accuracy >= 80) {
            rating = 4;
            performance = 'Rất tốt! 👏';
        } else if (accuracy >= 70) {
            rating = 3;
            performance = 'Tốt! 👍';
        } else if (accuracy >= 60) {
            rating = 2;
            performance = 'Khá! 😊';
        } else {
            rating = 1;
            performance = 'Cần cố gắng! 💪';
        }

        if (performanceText) performanceText.textContent = performance;

        // Update star rating
        if (ratingStars) {
            const stars = ratingStars.querySelectorAll('.star');
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.style.opacity = '1';
                } else {
                    star.style.opacity = '0.3';
                }
            });
        }

        this.showScreen('resultsScreen');
        this.triggerConfetti();
    }

    restartQuiz() {
        this.gameState.reset();
        this.showScreen('quizSetupScreen');
    }

    updateGameUI() {
        this.gameState.updateScoreDisplay();
        this.gameState.updateProgress();
        this.gameState.updateLives();
        this.updatePowerUpDisplay();
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = 'block';
            this.currentScreen = screenId;
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        container.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 3000);
    }

    handleKeyboardShortcuts(e) {
        if (!this.gameState.settings.keyboardHints) return;

        if (this.currentScreen === 'quizGameScreen' && this.gameState.isGameActive) {
            // Answer selection with number keys
            if (e.key >= '1' && e.key <= '4') {
                const answerIndex = parseInt(e.key) - 1;
                const answerBtns = document.querySelectorAll('.answer-btn');
                if (answerBtns[answerIndex]) {
                    this.selectAnswer(answerIndex);
                }
            }

            // Power-ups
            if (e.key === 's' || e.key === 'S') {
                this.useSkipPowerUp();
            }
            if (e.key === 'h' || e.key === 'H') {
                this.useHintPowerUp();
            }
            if (e.key === 't' || e.key === 'T') {
                this.useTimePowerUp();
            }
        }

        // Global shortcuts
        if (e.key === 'Escape') {
            if (this.currentScreen === 'quizGameScreen') {
                this.pauseGame();
            } else if (this.currentScreen !== 'mainMenuScreen') {
                this.showScreen('mainMenuScreen');
            }
        }
    }

    createParticleEffect() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            // Random particle shapes
            const shapes = ['●', '■', '▲', '♦', '★'];
            particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            
            particlesContainer.appendChild(particle);
        }
    }

    triggerConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confetti = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];

        // Create confetti pieces
        for (let i = 0; i < 100; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 6 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10
            });
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach((piece, index) => {
                piece.x += piece.vx;
                piece.y += piece.vy;
                piece.rotation += piece.rotationSpeed;

                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
                ctx.restore();

                // Remove confetti that's off screen
                if (piece.y > canvas.height) {
                    confetti.splice(index, 1);
                }
            });

            if (confetti.length > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                // Clear canvas when done
                setTimeout(() => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }, 1000);
            }
        }

        animateConfetti();
    }

    saveSettings() {
        localStorage.setItem('tritue-settings', JSON.stringify(this.gameState.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('tritue-settings');
        if (saved) {
            this.gameState.settings = { ...this.gameState.settings, ...JSON.parse(saved) };
            this.applySettings();
        }
    }    applySettings() {
        // Apply settings to UI elements
        const soundEffectsToggle = document.getElementById('soundEffectsToggle');
        const backgroundMusicToggle = document.getElementById('backgroundMusicToggle');
        const volumeSlider = document.getElementById('volumeSlider');

        if (soundEffectsToggle) {
            soundEffectsToggle.checked = this.gameState.settings.soundEffects;
        }
        if (backgroundMusicToggle) {
            backgroundMusicToggle.checked = this.gameState.settings.backgroundMusic;
        }
        if (volumeSlider) {
            volumeSlider.value = this.gameState.settings.volume;
            const volumeValue = document.querySelector('.volume-value');
            if (volumeValue) {
                volumeValue.textContent = `${this.gameState.settings.volume}%`;
            }
        }
        
        // Sync with SoundManager
        if (this.soundManager) {
            this.soundManager.soundEnabled = this.gameState.settings.soundEffects;
            this.soundManager.musicEnabled = this.gameState.settings.backgroundMusic;
            this.soundManager.setVolume(this.gameState.settings.volume / 100);
            this.soundManager.updateSoundToggleUI();
        }
    }
}

// =============================================
// MEMORY GAME CLASS
// =============================================

class MemoryGame {
    constructor(educationalGame) {
        this.educationalGame = educationalGame;
        this.gameState = educationalGame.gameState;
        this.currentTheme = null;
        this.currentDifficulty = null;
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.startTime = null;
        this.timer = null;
        
        this.themes = {
            animals: ['🐱', '🐶', '🐰', '🐸', '🐝', '🐠', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯'],
            fruits: ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍑', '🥭', '🍍', '🥥', '🍈', '🍉'],
            colors: ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '🔘', '🟥', '🟧', '🟨'],
            numbers: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '📊', '📈']
        };
    }

    setupMemoryGame() {
        this.setupMemoryEventListeners();
    }

    setupMemoryEventListeners() {
        // Theme selection
        document.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.currentTheme = card.dataset.theme;
                this.updateMemoryStartButton();
            });
        });

        // Difficulty selection
        document.querySelectorAll('.memory-difficulty-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.memory-difficulty-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.currentDifficulty = card.dataset.difficulty;
                this.updateMemoryStartButton();
            });
        });

        // Start button
        const startMemoryBtn = document.getElementById('startMemoryBtn');
        if (startMemoryBtn) {
            startMemoryBtn.addEventListener('click', () => {
                this.startMemoryGame();
            });
        }        // Back button
        const backToMainFromMemory = document.getElementById('backToMainFromMemory');
        if (backToMainFromMemory) {
            backToMainFromMemory.addEventListener('click', () => {
                this.educationalGame.showScreen('mainMenuScreen');
            });
        }
    }

    updateMemoryStartButton() {
        const startBtn = document.getElementById('startMemoryBtn');
        if (startBtn) {
            const canStart = this.currentTheme && this.currentDifficulty;
            startBtn.disabled = !canStart;
        }
    }

    startMemoryGame() {
        this.resetMemoryGame();
        this.generateCards();
        this.renderBoard();
        this.startMemoryTimer();
        this.gameState.showScreen = this.educationalGame.showScreen.bind(this.educationalGame);
        this.educationalGame.showScreen('memoryGameScreen');
    }

    resetMemoryGame() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.startTime = Date.now();
        this.gameState.score = 0;
        this.updateMemoryUI();
    }

    generateCards() {
        const gridSizes = {
            easy: { pairs: 6, grid: 'easy' },
            medium: { pairs: 8, grid: 'medium' },
            hard: { pairs: 12, grid: 'hard' }
        };

        const config = gridSizes[this.currentDifficulty];
        const themeSymbols = this.themes[this.currentTheme];
        const selectedSymbols = themeSymbols.slice(0, config.pairs);
        
        this.cards = [];
        selectedSymbols.forEach((symbol, index) => {
            this.cards.push({ id: index * 2, symbol, matched: false });
            this.cards.push({ id: index * 2 + 1, symbol, matched: false });
        });

        // Shuffle cards
        this.cards = this.cards.sort(() => Math.random() - 0.5);
    }

    renderBoard() {
        const board = document.getElementById('memoryBoard');
        if (!board) return;

        board.className = `memory-board ${this.currentDifficulty}`;
        board.innerHTML = '';

        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.index = index;
            
            cardElement.innerHTML = `
                <div class="card-face card-back">❓</div>
                <div class="card-face card-front">${card.symbol}</div>
            `;

            cardElement.addEventListener('click', () => this.flipCard(index));
            board.appendChild(cardElement);
        });
    }    flipCard(index) {
        if (this.flippedCards.length >= 2 || this.flippedCards.includes(index) || this.cards[index].matched) {
            return;
        }

        const cardElement = document.querySelector(`[data-index="${index}"]`);
        cardElement.classList.add('flipped');
        this.flippedCards.push(index);
        
        // Play card flip sound
        this.educationalGame.playSound('cardFlip');

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateMemoryUI();
            this.checkMatch();
        }
    }

    checkMatch() {
        const [first, second] = this.flippedCards;
        const card1 = this.cards[first];
        const card2 = this.cards[second];        setTimeout(() => {
            if (card1.symbol === card2.symbol) {
                // Match found
                card1.matched = true;
                card2.matched = true;
                this.matchedPairs++;
                this.gameState.score += 100;

                const cardElements = [
                    document.querySelector(`[data-index="${first}"]`),
                    document.querySelector(`[data-index="${second}"]`)
                ];
                cardElements.forEach(el => el.classList.add('matched'));

                // Play success sound
                this.educationalGame.playSound('success');
                this.checkWin();
            } else {
                // No match
                const cardElements = [
                    document.querySelector(`[data-index="${first}"]`),
                    document.querySelector(`[data-index="${second}"]`)
                ];
                cardElements.forEach(el => el.classList.remove('flipped'));
                
                // Play error sound
                this.educationalGame.playSound('error');
            }

            this.flippedCards = [];
            this.updateMemoryUI();
        }, 1000);
    }

    checkWin() {
        const totalPairs = this.cards.length / 2;
        if (this.matchedPairs === totalPairs) {
            this.endMemoryGame();
        }
    }

    startMemoryTimer() {
        this.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            
            const timerElement = document.getElementById('memoryTimer');
            if (timerElement) {
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    endMemoryGame() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const bonus = Math.max(0, 1000 - (this.moves * 10) - elapsed);
        this.gameState.score += bonus;        setTimeout(() => {
            alert(`🎉 Chúc mừng! Bạn đã hoàn thành!\n\nThời gian: ${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')}\nSố lượt: ${this.moves}\nĐiểm: ${this.gameState.score}`);
            this.educationalGame.showScreen('mainMenuScreen');
        }, 1500);
    }

    updateMemoryUI() {
        const scoreElement = document.getElementById('memoryScore');
        const movesElement = document.getElementById('movesCount');
        const pairsElement = document.getElementById('pairsFound');

        if (scoreElement) scoreElement.textContent = this.gameState.score;
        if (movesElement) movesElement.textContent = this.moves;
        if (pairsElement) {
            const totalPairs = this.cards.length / 2;
            pairsElement.textContent = `${this.matchedPairs}/${totalPairs}`;
        }
    }
}

// =============================================
// PUZZLE GAME CLASS
// =============================================

class PuzzleGame {
    constructor(educationalGame) {
        this.educationalGame = educationalGame;
        this.gameState = educationalGame.gameState;
        this.currentImage = null;
        this.currentPieces = null;
        this.board = [];
        this.emptyPosition = null;
        this.moves = 0;
        this.startTime = null;
        this.timer = null;

        this.puzzleImages = {
            nature: { emoji: '🏞️', name: 'Thiên nhiên' },
            animals: { emoji: '🦁', name: 'Động vật' },
            space: { emoji: '🚀', name: 'Vũ trụ' },
            cartoon: { emoji: '🎭', name: 'Hoạt hình' }
        };
    }

    setupPuzzleGame() {
        this.setupPuzzleEventListeners();
    }

    setupPuzzleEventListeners() {
        // Image selection
        document.querySelectorAll('.puzzle-image-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.puzzle-image-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.currentImage = card.dataset.image;
                this.updatePuzzleStartButton();
            });
        });

        // Pieces selection
        document.querySelectorAll('.pieces-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.pieces-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                this.currentPieces = parseInt(option.dataset.pieces);
                this.updatePuzzleStartButton();
            });
        });

        // Start button
        const startPuzzleBtn = document.getElementById('startPuzzleBtn');
        if (startPuzzleBtn) {
            startPuzzleBtn.addEventListener('click', () => {
                this.startPuzzleGame();
            });
        }        // Back button
        const backToMainFromPuzzle = document.getElementById('backToMainFromPuzzle');
        if (backToMainFromPuzzle) {
            backToMainFromPuzzle.addEventListener('click', () => {
                this.educationalGame.showScreen('mainMenuScreen');
            });
        }
    }

    updatePuzzleStartButton() {
        const startBtn = document.getElementById('startPuzzleBtn');
        if (startBtn) {
            const canStart = this.currentImage && this.currentPieces;
            startBtn.disabled = !canStart;
        }
    }    startPuzzleGame() {
        this.resetPuzzleGame();
        this.initializeBoard();
        this.shuffleBoard();
        this.renderBoard();
        this.renderPreview();
        this.startPuzzleTimer();
        this.educationalGame.showScreen('puzzleGameScreen');
    }

    resetPuzzleGame() {
        this.board = [];
        this.moves = 0;
        this.startTime = Date.now();
        this.gameState.score = 0;
        this.updatePuzzleUI();
    }

    initializeBoard() {
        const size = Math.sqrt(this.currentPieces);
        this.board = [];
        
        for (let i = 0; i < this.currentPieces - 1; i++) {
            this.board.push(i + 1);
        }
        this.board.push(null); // Empty space
        this.emptyPosition = this.currentPieces - 1;
    }

    shuffleBoard() {
        // Perform random valid moves to ensure solvability
        for (let i = 0; i < 1000; i++) {
            const validMoves = this.getValidMoves();
            if (validMoves.length > 0) {
                const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                this.movePiece(randomMove, false);
            }
        }
    }

    getValidMoves() {
        const size = Math.sqrt(this.currentPieces);
        const row = Math.floor(this.emptyPosition / size);
        const col = this.emptyPosition % size;
        const moves = [];

        // Up
        if (row > 0) moves.push(this.emptyPosition - size);
        // Down
        if (row < size - 1) moves.push(this.emptyPosition + size);
        // Left
        if (col > 0) moves.push(this.emptyPosition - 1);
        // Right
        if (col < size - 1) moves.push(this.emptyPosition + 1);

        return moves;
    }    renderBoard() {
        const board = document.getElementById('puzzleBoard');
        if (!board) return;

        const size = Math.sqrt(this.currentPieces);
        board.className = `puzzle-board size-${size}`;
        board.innerHTML = '';

        this.board.forEach((piece, index) => {
            const pieceElement = document.createElement('div');
            pieceElement.className = 'puzzle-piece';
            pieceElement.dataset.index = index;

            if (piece === null) {
                pieceElement.classList.add('empty');
            } else {
                // Show image fragment instead of number
                this.renderPieceImage(pieceElement, piece, size);
                pieceElement.addEventListener('click', () => this.movePiece(index));
            }

            board.appendChild(pieceElement);
        });
    }    renderPieceImage(element, pieceNumber, gridSize) {
        if (!this.currentImage) return;
        
        const image = this.puzzleImages[this.currentImage];
        
        // Calculate position in grid for this piece
        const row = Math.floor((pieceNumber - 1) / gridSize);
        const col = (pieceNumber - 1) % gridSize;
        
        // Create a visual representation using colored backgrounds and emoji parts
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#e17055'];
        const pieceColor = colors[(pieceNumber - 1) % colors.length];
        
        // Set background with emoji and color
        element.style.background = `linear-gradient(45deg, ${pieceColor}80, ${pieceColor}40)`;
        element.style.border = `2px solid ${pieceColor}`;
        
        // Add the emoji as content with position-based styling
        element.innerHTML = `
            <div class="piece-content">
                <span class="piece-emoji">${image.emoji}</span>
                <span class="piece-number">${pieceNumber}</span>
            </div>
        `;
    }

    renderPreview() {
        const preview = document.getElementById('previewImage');
        if (preview && this.currentImage) {
            const image = this.puzzleImages[this.currentImage];
            preview.textContent = image.emoji;
            preview.title = image.name;
        }
    }

    movePiece(position, updateUI = true) {
        const validMoves = this.getValidMoves();
        if (!validMoves.includes(position)) return false;

        // Swap piece with empty space
        const temp = this.board[position];
        this.board[position] = this.board[this.emptyPosition];
        this.board[this.emptyPosition] = temp;
        this.emptyPosition = position;

        if (updateUI) {
            this.moves++;
            this.gameState.score = Math.max(0, 1000 - this.moves);
            this.renderBoard();
            this.updatePuzzleUI();
            this.checkWin();
            
            // Play click sound
            this.educationalGame.playSound('click');
        }

        return true;
    }    checkWin() {
        const solved = this.board.every((piece, index) => {
            if (index === this.currentPieces - 1) return piece === null;
            return piece === index + 1;
        });

        if (solved) {
            // Play success sound
            this.educationalGame.playSound('success');
            this.endPuzzleGame();
        }
    }

    startPuzzleTimer() {
        this.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            
            const timerElement = document.getElementById('puzzleTimer');
            if (timerElement) {
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    endPuzzleGame() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const bonus = Math.max(0, 500 - elapsed);
        this.gameState.score += bonus;        setTimeout(() => {
            alert(`🎉 Chúc mừng! Bạn đã hoàn thành puzzle!\n\nThời gian: ${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')}\nSố nước đi: ${this.moves}\nĐiểm: ${this.gameState.score}`);
            this.educationalGame.showScreen('mainMenuScreen');
        }, 1500);
    }

    updatePuzzleUI() {
        const scoreElement = document.getElementById('puzzleScore');
        const movesElement = document.getElementById('puzzleMoves');
        const progressElement = document.getElementById('puzzleProgress');

        if (scoreElement) scoreElement.textContent = this.gameState.score;
        if (movesElement) movesElement.textContent = this.moves;
        
        if (progressElement) {
            const correctPieces = this.board.filter((piece, index) => {
                if (index === this.currentPieces - 1) return piece === null;
                return piece === index + 1;
            }).length;
            const progress = Math.round((correctPieces / this.currentPieces) * 100);
            progressElement.textContent = `${progress}%`;
        }
    }
}

// =============================================
// TYPING GAME CLASS
// =============================================

class TypingGame {
    constructor(educationalGame) {
        this.educationalGame = educationalGame;
        this.gameState = educationalGame.gameState;
        this.currentTextType = null;
        this.currentDifficulty = null;
        this.textToType = '';
        this.currentPosition = 0;
        this.errors = 0;
        this.startTime = null;
        this.timer = null;
        
        this.texts = {
            words: {
                beginner: ['con mèo', 'con chó', 'ngôi nhà', 'cái bàn', 'chiếc ghế', 'quyển sách', 'cây bút', 'tờ giấy'],
                intermediate: ['trường học', 'thư viện', 'bệnh viện', 'siêu thị', 'công viên', 'nhà ga', 'sân bay', 'bưu điện'],
                advanced: ['công nghệ thông tin', 'khoa học máy tính', 'trí tuệ nhân tạo', 'phát triển bền vững', 'kinh tế thị trường']
            },
            sentences: {
                beginner: ['Hôm nay trời đẹp.', 'Tôi thích đọc sách.', 'Con mèo ngủ trên ghế.', 'Cây xanh trong vườn.'],
                intermediate: ['Học sinh chăm chỉ học bài.', 'Gia đình tôi có bốn người.', 'Mùa xuân về cây cối xanh tươi.'],
                advanced: ['Việt Nam là đất nước có truyền thống văn hóa lâu đời.', 'Công nghệ phát triển mang lại nhiều tiện ích cho cuộc sống.']
            },
            stories: {
                beginner: ['Ngày xưa có một cô bé tên là Tấm. Cô rất hiền lành và chăm chỉ. Mỗi ngày cô đều giúp mẹ làm việc nhà.'],
                intermediate: ['Trong một ngôi làng nhỏ, có một chàng trai tên Thạch Sanh. Chàng sống với mẹ già trong căn nhà tranh nhỏ. Chàng rất hiếu thảo và chăm chỉ làm việc.'],
                advanced: ['Việt Nam nằm ở vị trí chiến lược quan trọng trong khu vực Đông Nam Á. Với đường bờ biển dài hơn 3.400 km và địa hình đa dạng từ miền núi phía Bắc đến đồng bằng sông Cửu Long, đất nước ta có nhiều tiềm năng phát triển kinh tế biển và du lịch.']
            }
        };
    }

    setupTypingGame() {
        this.setupTypingEventListeners();
    }

    setupTypingEventListeners() {
        // Text type selection
        document.querySelectorAll('.text-type-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.text-type-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.currentTextType = card.dataset.type;
                this.updateTypingStartButton();
            });
        });

        // Difficulty selection
        document.querySelectorAll('.typing-difficulty-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.typing-difficulty-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.currentDifficulty = card.dataset.difficulty;
                this.updateTypingStartButton();
            });
        });

        // Start button
        const startTypingBtn = document.getElementById('startTypingBtn');
        if (startTypingBtn) {
            startTypingBtn.addEventListener('click', () => {
                this.startTypingGame();
            });
        }        // Back button
        const backToMainFromTyping = document.getElementById('backToMainFromTyping');
        if (backToMainFromTyping) {
            backToMainFromTyping.addEventListener('click', () => {
                this.educationalGame.showScreen('mainMenuScreen');
            });
        }
    }

    updateTypingStartButton() {
        const startBtn = document.getElementById('startTypingBtn');
        if (startBtn) {
            const canStart = this.currentTextType && this.currentDifficulty;
            startBtn.disabled = !canStart;
        }
    }

    startTypingGame() {
        this.resetTypingGame();
        this.generateText();
        this.renderText();        this.setupTypingInput();
        this.startTypingTimer();
        this.educationalGame.showScreen('typingGameScreen');
    }

    resetTypingGame() {
        this.currentPosition = 0;
        this.errors = 0;
        this.startTime = Date.now();
        this.gameState.score = 0;
        this.updateTypingUI();
    }

    generateText() {
        const texts = this.texts[this.currentTextType][this.currentDifficulty];
        if (this.currentTextType === 'words') {
            // For words, join multiple words
            const selectedWords = [];
            for (let i = 0; i < 10; i++) {
                selectedWords.push(texts[Math.floor(Math.random() * texts.length)]);
            }
            this.textToType = selectedWords.join(' ');
        } else {
            // For sentences and stories, pick one
            this.textToType = texts[Math.floor(Math.random() * texts.length)];
        }
    }

    renderText() {
        const textContainer = document.getElementById('textToType');
        if (!textContainer) return;

        textContainer.innerHTML = '';
        [...this.textToType].forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;
            if (index === this.currentPosition) {
                span.classList.add('current');
            }
            textContainer.appendChild(span);
        });
    }

    setupTypingInput() {
        const input = document.getElementById('typingInput');
        if (!input) return;

        input.value = '';
        input.disabled = false;
        input.focus();

        input.addEventListener('input', (e) => this.handleTyping(e));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                this.handleBackspace();
            }
        });
    }    handleTyping(e) {
        const input = e.target;
        const typedText = input.value;
        
        if (typedText.length > this.textToType.length) {
            input.value = typedText.slice(0, this.textToType.length);
            return;
        }

        this.currentPosition = typedText.length;
        this.updateTextDisplay();
        this.updateTypingUI();

        // Play typing sound
        this.educationalGame.playSound('typing', { volume: 0.3 });

        if (typedText === this.textToType) {
            // Play success sound
            this.educationalGame.playSound('success');
            this.endTypingGame();
        }
    }

    handleBackspace() {
        // Allow backspace but update display
        setTimeout(() => {
            const input = document.getElementById('typingInput');
            if (input) {
                this.currentPosition = input.value.length;
                this.updateTextDisplay();
                this.updateTypingUI();
            }
        }, 0);
    }

    updateTextDisplay() {
        const textContainer = document.getElementById('textToType');
        if (!textContainer) return;

        const input = document.getElementById('typingInput');
        const typedText = input ? input.value : '';

        textContainer.innerHTML = '';
        [...this.textToType].forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;

            if (index < typedText.length) {
                if (typedText[index] === char) {
                    span.classList.add('correct');
                } else {
                    span.classList.add('incorrect');
                    this.errors++;
                }
            } else if (index === typedText.length) {
                span.classList.add('current');
            }

            textContainer.appendChild(span);
        });
    }

    calculateWPM() {
        if (!this.startTime) return 0;
        
        const input = document.getElementById('typingInput');
        const typedChars = input ? input.value.length : 0;
        const minutes = (Date.now() - this.startTime) / 60000;
        const words = typedChars / 5; // Standard: 5 characters = 1 word
        
        return Math.round(words / minutes) || 0;
    }

    calculateAccuracy() {
        const input = document.getElementById('typingInput');
        const typedText = input ? input.value : '';
        if (typedText.length === 0) return 100;

        const correctChars = typedText.split('').filter((char, index) => 
            char === this.textToType[index]
        ).length;

        return Math.round((correctChars / typedText.length) * 100);
    }

    startTypingTimer() {
        this.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            
            const timerElement = document.getElementById('typingTimer');
            if (timerElement) {
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }

            this.updateTypingUI();
        }, 1000);
    }

    endTypingGame() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        const input = document.getElementById('typingInput');
        if (input) {
            input.disabled = true;
        }
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const wpm = this.calculateWPM();
        const accuracy = this.calculateAccuracy();
        this.gameState.score = wpm * accuracy;        setTimeout(() => {
            alert(`🎉 Hoàn thành!\n\nTốc độ: ${wpm} WPM\nChính xác: ${accuracy}%\nThời gian: ${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')}\nĐiểm: ${this.gameState.score}`);
            this.educationalGame.showScreen('mainMenuScreen');
        }, 1500);
    }

    updateTypingUI() {
        const wpmElement = document.getElementById('typingWPM');
        const accuracyElement = document.getElementById('typingAccuracy');
        const progressElement = document.getElementById('typingProgress');
        const charactersTypedElement = document.getElementById('charactersTyped');
        const errorsElement = document.getElementById('errorsCount');

        const wpm = this.calculateWPM();
        const accuracy = this.calculateAccuracy();
        const input = document.getElementById('typingInput');
        const typedLength = input ? input.value.length : 0;
        const progress = Math.round((typedLength / this.textToType.length) * 100);

        if (wpmElement) wpmElement.textContent = wpm;
        if (accuracyElement) accuracyElement.textContent = `${accuracy}%`;
        if (progressElement) progressElement.textContent = `${progress}%`;
        if (charactersTypedElement) charactersTypedElement.textContent = typedLength;
        if (errorsElement) errorsElement.textContent = this.errors;
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EducationalGame();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});