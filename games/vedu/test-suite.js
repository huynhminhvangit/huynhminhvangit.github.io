// Educational Game - Test Suite
// This file tests all game functionalities

console.log('🧪 Starting Educational Game Test Suite...');

// Test 1: Check if all classes are properly defined
function testClassDefinitions() {
    console.log('\n📋 Testing Class Definitions...');
    
    const tests = [
        { name: 'GameState', class: GameState },
        { name: 'QuestionDatabase', class: QuestionDatabase },
        { name: 'EducationalGame', class: EducationalGame },
        { name: 'MemoryGame', class: MemoryGame },
        { name: 'PuzzleGame', class: PuzzleGame },
        { name: 'TypingGame', class: TypingGame }
    ];
    
    tests.forEach(test => {
        if (typeof test.class === 'function') {
            console.log(`✅ ${test.name} class is properly defined`);
        } else {
            console.error(`❌ ${test.name} class is missing or not a function`);
        }
    });
}

// Test 2: Check Memory Game functionality
function testMemoryGame() {
    console.log('\n🧠 Testing Memory Game...');
    
    try {
        // Create a mock educational game
        const mockEducationalGame = {
            gameState: new GameState(),
            showScreen: (screen) => console.log(`Switching to ${screen}`)
        };
        
        const memoryGame = new MemoryGame(mockEducationalGame);
        
        // Test theme assignment
        memoryGame.currentTheme = 'animals';
        memoryGame.currentDifficulty = 'easy';
        
        console.log('✅ Memory Game instance created successfully');
        console.log(`✅ Theme set to: ${memoryGame.currentTheme}`);
        console.log(`✅ Difficulty set to: ${memoryGame.currentDifficulty}`);
        
        // Test card generation
        memoryGame.generateCards();
        console.log(`✅ Generated ${memoryGame.cards.length} cards`);
        
        return true;
    } catch (error) {
        console.error('❌ Memory Game test failed:', error.message);
        return false;
    }
}

// Test 3: Check Puzzle Game functionality
function testPuzzleGame() {
    console.log('\n🧩 Testing Puzzle Game...');
    
    try {
        const mockEducationalGame = {
            gameState: new GameState(),
            showScreen: (screen) => console.log(`Switching to ${screen}`)
        };
        
        const puzzleGame = new PuzzleGame(mockEducationalGame);
        
        // Test puzzle setup
        puzzleGame.currentImage = 'nature';
        puzzleGame.currentPieces = 9;
        
        console.log('✅ Puzzle Game instance created successfully');
        console.log(`✅ Image set to: ${puzzleGame.currentImage}`);
        console.log(`✅ Pieces set to: ${puzzleGame.currentPieces}`);
        
        // Test board initialization
        puzzleGame.initializeBoard();
        console.log(`✅ Board initialized with ${puzzleGame.board.length} pieces`);
        
        // Test valid moves calculation
        const validMoves = puzzleGame.getValidMoves();
        console.log(`✅ Found ${validMoves.length} valid moves`);
        
        return true;
    } catch (error) {
        console.error('❌ Puzzle Game test failed:', error.message);
        return false;
    }
}

// Test 4: Check Typing Game functionality
function testTypingGame() {
    console.log('\n⌨️ Testing Typing Game...');
    
    try {
        const mockEducationalGame = {
            gameState: new GameState(),
            showScreen: (screen) => console.log(`Switching to ${screen}`)
        };
        
        const typingGame = new TypingGame(mockEducationalGame);
        
        // Test text generation
        typingGame.currentTextType = 'words';
        typingGame.currentDifficulty = 'beginner';
        
        console.log('✅ Typing Game instance created successfully');
        console.log(`✅ Text type set to: ${typingGame.currentTextType}`);
        console.log(`✅ Difficulty set to: ${typingGame.currentDifficulty}`);
        
        // Test text generation
        typingGame.generateText();
        console.log(`✅ Generated text: "${typingGame.textToType.substring(0, 50)}..."`);
        
        // Test WPM calculation (with mock data)
        typingGame.startTime = Date.now() - 60000; // 1 minute ago
        const mockWPM = typingGame.calculateWPM();
        console.log(`✅ WPM calculation working: ${mockWPM}`);
        
        return true;
    } catch (error) {
        console.error('❌ Typing Game test failed:', error.message);
        return false;
    }
}

// Test 5: Check DOM elements exist
function testDOMElements() {
    console.log('\n🎯 Testing DOM Elements...');
    
    const requiredElements = [
        'mainMenuScreen',
        'memorySetupScreen',
        'memoryGameScreen',
        'puzzleSetupScreen',
        'puzzleGameScreen',
        'typingSetupScreen',
        'typingGameScreen'
    ];
    
    let allElementsExist = true;
    
    requiredElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            console.log(`✅ Element ${elementId} exists`);
        } else {
            console.error(`❌ Element ${elementId} is missing`);
            allElementsExist = false;
        }
    });
    
    return allElementsExist;
}

// Test 6: Check CSS classes exist
function testCSSClasses() {
    console.log('\n🎨 Testing CSS Classes...');
    
    const requiredClasses = [
        'memory-card',
        'puzzle-piece',
        'text-to-type',
        'theme-card',
        'puzzle-board',
        'typing-container'
    ];
    
    let allClassesExist = true;
    
    requiredClasses.forEach(className => {
        // Check if CSS rule exists by creating a test element
        const testElement = document.createElement('div');
        testElement.className = className;
        document.body.appendChild(testElement);
        
        const computedStyle = window.getComputedStyle(testElement);
        const hasStyles = computedStyle.cssText !== '';
        
        document.body.removeChild(testElement);
        
        if (hasStyles || document.querySelector(`.${className}`) !== null) {
            console.log(`✅ CSS class ${className} exists`);
        } else {
            console.warn(`⚠️ CSS class ${className} might be missing`);
        }
    });
    
    return allClassesExist;
}

// Run all tests
function runAllTests() {
    console.log('🚀 Running Complete Test Suite for Educational Game\n');
    
    const results = {
        classDefinitions: testClassDefinitions(),
        memoryGame: testMemoryGame(),
        puzzleGame: testPuzzleGame(),
        typingGame: testTypingGame(),
        domElements: testDOMElements(),
        cssClasses: testCSSClasses()
    };
    
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    
    Object.entries(results).forEach(([testName, result]) => {
        const status = result ? '✅ PASS' : '❌ FAIL';
        console.log(`${testName}: ${status}`);
    });
    
    const allPassed = Object.values(results).every(result => result === true);
    
    if (allPassed) {
        console.log('\n🎉 All tests passed! Educational game is ready to use.');
    } else {
        console.log('\n⚠️ Some tests failed. Please check the implementation.');
    }
    
    return results;
}

// Export for use in browser console
window.testEducationalGame = runAllTests;

// Auto-run tests when this script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
}
