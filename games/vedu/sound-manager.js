// Sound Manager for Educational Game
class SoundManager {
    constructor() {
        this.sounds = {};
        this.backgroundMusic = null;
        this.volume = 0.5;
        this.soundEnabled = true;
        this.musicEnabled = true;
        this.isPlaying = false;
        this.init();
    }
    
    init() {
        // Create audio context if supported
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported, using HTML5 audio');
        }
        
        // Define sound URLs (these would be actual audio files)
        this.soundUrls = {
            click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIeOz2h3/LEeSMFllzFrYhLhKgNOFi14+WhSSNRaNrS7W4dXQUtfNnp5eoTlDMbOsJLUO7+RZrWVVSGzVOGyGOGU0WnqCBnQu6lVd5zNuHaSUPq4Vw8SkJCUFLJYnJn4Ebc2Ob0HaFRY3HYnW9rIWHmZoLKJqLqSUIqpNd/U02l4cTqNdXqNZXJJKNjVvIrpOdGm9PaHJ9PPWXUZHHnI2H1U0StgOkNcUYqLHKu0LCvNUcmtCDFtAhlhOZ1pJfhc4gmlT8waDEGHVKJQppKN4Z3n9vhJrWVJnJSZR82YxL9YJ7vq8++btXx2dTZZ6GnWkaDKJEZMpzCHQ==',
            success: 'data:audio/wav;base64,UklGRjoFAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQwFAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIeOz2h3/LEeSMFllzFrYhLhKgNOFi14+WhSSNRaNrS7W4dXQUtfNnp5eoTlDMbOsJLUO7+RZrWVVSGzVOGyGOGU0WnqCBnQu6lVd5zNuHaSUPq4Vw8SkJCUFLJYnJn4Ebc2Ob0HaFRY3HYnW9rIWHmZoLKJqLqSUIqpNd/U02l4cTqNdXqNZXJJKNjVvIrpOdGm9PaHJ9PPWXUZHHnI2H1U0StgOkNcUYqLHKu0LCvNUcmtCDFtAhlhOZ1pJfhc4gmlT8waDEGHVKJQppKN4Z3n9vhJrWVJnJSZR82YxL9YJ7vq8++btXx2dTZZ6GnWkaDKJEZMpzCHQ==',
            error: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIeOz2h3/LEeSMFllzFrYhLhKgNOFi14+WhSSNRaNrS7W4dXQUtfNnp5eoTlDMbOsJLUO7+RZrWVVSGzVOGyGOGU0WnqCBnQu6lVd5zNuHaSUPq4Vw8SkJCUFLJYnJn4Ebc2Ob0HaFRY3HYnW9rIWHmZoLKJqLqSUIqpNd/U02l4cTqNdXqNZXJJKNjVvIrpOdGm9PaHJ9PPWXUZHHnI2H1U0StgOkNcUYqLHKu0LCvNUcmtCDFtAhlhOZ1pJfhc4gmlT8waDEGHVKJQppKN4Z3n9vhJrWVJnJSZR82YxL9YJ7vq8++btXx2dTZZ6GnWkaDKJEZMpzCHQ==',
            cardFlip: 'data:audio/wav;base64,UklGRjgEAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQgEAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIeOz2h3/LEeSMFllzFrYhLhKgNOFi14+WhSSNRaNrS7W4dXQUtfNnp5eoTlDMbOsJLUO7+RZrWVVSGzVOGyGOGU0WnqCBnQu6lVd5zNuHaSUPq4Vw8SkJCUFLJYnJn4Ebc2Ob0HaFRY3HYnW9rIWHmZoLKJqLqSUIqpNd/U02l4cTqNdXqNZXJJKNjVvIrpOdGm9PaHJ9PPWXUZHHnI2H1U0StgOkNcUYqLHKu0LCvNUcmtCDFtAhlhOZ1pJfhc4gmlT8waDEGHVKJQppKN4Z3n9vhJrWVJnJSZR82YxL9YJ7vq8++btXx2dTZZ6GnWkaDKJEZMpzCHQ==',
            typing: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIeOz2h3/LEeSMFllzFrYhLhKgNOFi14+WhSSNRaNrS7W4dXQUtfNnp5eoTlDMbOsJLUO7+RZrWVVSGzVOGyGOGU0WnqCBnQu6lVd5zNuHaSUPq4Vw8SkJCUFLJYnJn4Ebc2Ob0HaFRY3HYnW9rIWHmZoLKJqLqSUIqpNd/U02l4cTqNdXqNZXJJKNjVvIrpOdGm9PaHJ9PPWXUZHHnI2H1U0StgOkNcUYqLHKu0LCvNUcmtCDFtAhlhOZ1pJfhc4gmlT8waDEGHVKJQppKN4Z3n9vhJrWVJnJSZR82YxL9YJ7vq8++btXx2dTZZ6GnWkaDKJEZMpzCHQ=='
        };

        // Background music URL (placeholder - would be replaced with actual music file)
        this.backgroundMusicUrl = 'assets/audios/nature.wav'; // Replace with actual URL
    }
    
    loadSound(name, url) {
        return new Promise((resolve, reject) => {
            const audio = new Audio(url);
            audio.preload = 'auto';
            audio.volume = this.volume;
            
            audio.addEventListener('canplaythrough', () => {
                this.sounds[name] = audio;
                resolve();
            });
            
            audio.addEventListener('error', (e) => {
                console.warn(`Failed to load sound: ${name}`, e);
                reject(e);
            });
        });
    }
      async loadAllSounds() {
        const loadPromises = Object.entries(this.soundUrls).map(([name, url]) => 
            this.loadSound(name, url).catch(() => {
                // Continue even if individual sounds fail to load
            })
        );
        
        await Promise.allSettled(loadPromises);
        
        // Load background music
        await this.loadBackgroundMusic();
        
        console.log('Sound Manager initialized');
    }

    async loadBackgroundMusic() {
        try {
            this.backgroundMusic = new Audio(this.backgroundMusicUrl);
            this.backgroundMusic.loop = true;
            this.backgroundMusic.volume = this.volume * 0.3; // Background music at 30% of main volume
            console.log('Background music loaded');
        } catch (error) {
            console.warn('Failed to load background music:', error);
        }
    }
    
    play(soundName, options = {}) {
        if (!this.soundEnabled) return;
        
        const sound = this.sounds[soundName];
        if (!sound) {
            console.warn(`Sound not found: ${soundName}`);
            return;
        }
        
        try {
            sound.currentTime = 0;
            sound.volume = (options.volume || 1) * this.volume;
            const playPromise = sound.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Sound play failed:', error);
                });
            }
        } catch (error) {
            console.warn('Sound play error:', error);
        }
    }
      setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.volume;
        });
        
        // Update background music volume
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.volume * 0.3; // Background music at 30% of main volume
        }
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.updateSoundToggleUI();
        return this.soundEnabled;
    }
    
    // Method to enable audio context after user interaction
    enableAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().then(() => {
                console.log('Audio context resumed');
            }).catch(error => {
                console.warn('Failed to resume audio context:', error);
            });
        }
    }
    
    startBackgroundMusic() {
        // Enable audio context first
        this.enableAudioContext();
        
        if (!this.musicEnabled || !this.backgroundMusic) return;
        
        try {
            this.backgroundMusic.currentTime = 0;
            this.backgroundMusic.volume = this.volume * 0.9;
            const playPromise = this.backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.isPlaying = true;
                    console.log('Background music started');
                }).catch(error => {
                    console.warn('Background music play failed:', error);
                    // Try to play a silent sound first to unlock audio
                    this.unlockAudio();
                });
            }
        } catch (error) {
            console.warn('Background music start error:', error);
        }
    }
    
    // Method to unlock audio playback on mobile/browsers
    unlockAudio() {
        const unlockAudio = () => {
            if (this.backgroundMusic && this.musicEnabled) {
                this.backgroundMusic.play().then(() => {
                    this.isPlaying = true;
                    console.log('Background music unlocked and started');
                    document.removeEventListener('touchstart', unlockAudio);
                    document.removeEventListener('click', unlockAudio);
                }).catch(() => {
                    console.warn('Audio unlock failed');
                });
            }
        };
        
        document.addEventListener('touchstart', unlockAudio, { once: true });
        document.addEventListener('click', unlockAudio, { once: true });
    }
    
    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.isPlaying = false;
            console.log('Background music stopped');
        }
    }
    
    toggleBackgroundMusic() {
        this.musicEnabled = !this.musicEnabled;
        
        if (this.musicEnabled) {
            this.startBackgroundMusic();
        } else {
            this.stopBackgroundMusic();
        }
        
        this.updateSoundToggleUI();
        return this.musicEnabled;
    }
    
    updateSoundToggleUI() {
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            const soundIcon = soundToggle.querySelector('.sound-icon');
            const soundWaves = soundToggle.querySelector('.sound-waves');
            
            if (this.soundEnabled && this.musicEnabled) {
                soundIcon.textContent = '🔊';
                soundWaves.style.opacity = '1';
                soundToggle.title = 'Tắt âm thanh';
            } else {
                soundIcon.textContent = '🔇';
                soundWaves.style.opacity = '0.3';
                soundToggle.title = 'Bật âm thanh';
            }
        }
    }
}

// Export for use in the main game
window.SoundManager = SoundManager;
