# Steampunk Game Feel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reusable "game feel" (juice) system — muzzle flash, projectile trails, hit sparks, knockback, hit-stop, screen shake, flash vignettes, floating score text, and audio tuning — to make shooting and damage feedback in the Steampunk deep-sea shooter feel weightier and more engaging.

**Architecture:** Add three small helper classes (`Juice`, `Spark`, `FloatingText`) inside the existing `window.onload` handler in `games/steampunk/script.js`, then wire them into the existing `Game`, `Player`, `Projectile`, and `Enemy` classes. No new image/audio assets, no changes to `index.html`/`style.css`, no rework of existing class structure.

**Tech Stack:** Vanilla JavaScript (Canvas 2D), browser only. No test harness exists in this project; verification uses `node --check` (syntax) plus manual browser testing.

**Spec:** `docs/superpowers/specs/2026-08-11-steampunk-game-feel-design.md`

---

## File Structure

- Modify: `games/steampunk/script.js` — the only file changed.
  - Add `Spark` and `FloatingText` classes (Task 1).
  - Add `Juice` class + wire into `Game` (Task 2).
  - Modify `Projectile` + `Player.shootTop` for firing feedback (Task 3).
  - Modify `Enemy` + `Game.update` collision loop for hit feedback (Task 4).
  - Modify `Game.update` player-hit branch + `Player.draw` for player damage feedback (Task 5).
  - Audio volume tuning (Task 6).

All bash commands assume the working directory is the repo root `D:\projects\vDev\huynhminhvangit.github.io`.

---

### Task 1: Add Spark and FloatingText helper classes

**Files:**
- Modify: `games/steampunk/script.js` (add two classes right after the `Particle` class, before the `Player` class)

- [ ] **Step 1: Add the `Spark` class**

Insert this block directly after the closing `}` of the `Particle` class:

```js
  class Spark {
    constructor(game, x, y, angle, speed, color, size, life) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * speed * (0.6 + Math.random() * 0.8);
      this.vy = Math.sin(angle) * speed * (0.6 + Math.random() * 0.8);
      this.color = color;
      this.size = size;
      this.life = life;
      this.timer = 0;
      this.markedForDeletion = false;
    }

    update(deltaTime) {
      this.timer += deltaTime;
      if (this.timer >= this.life) {
        this.markedForDeletion = true;
        return;
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.92;
      this.vy *= 0.92;
    }

    draw(context) {
      const alpha = 1 - (this.timer / this.life);
      context.globalAlpha = alpha;
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, Math.max(0.5, this.size * alpha), 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = 1;
    }
  }
```

- [ ] **Step 2: Add the `FloatingText` class**

Insert this block directly after the `Spark` class:

```js
  class FloatingText {
    constructor(game, x, y, text, color) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.text = text;
      this.color = color;
      this.timer = 0;
      this.life = 800;
      this.markedForDeletion = false;
    }

    update(deltaTime) {
      this.timer += deltaTime;
      this.y -= 0.04 * deltaTime;
      if (this.timer >= this.life) this.markedForDeletion = true;
    }

    draw(context) {
      const alpha = 1 - (this.timer / this.life);
      context.globalAlpha = alpha;
      context.fillStyle = this.color;
      context.font = 'bold 22px Bangers';
      context.textAlign = 'center';
      context.fillText(this.text, this.x, this.y);
      context.globalAlpha = 1;
    }
  }
```

- [ ] **Step 3: Syntax check**

Run: `node --check games/steampunk/script.js`
Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add games/steampunk/script.js
git commit -m "feat: add Spark and FloatingText helper classes"
```

---

### Task 2: Add Juice system and wire it into Game

**Files:**
- Modify: `games/steampunk/script.js` (add `Juice` class after `FloatingText`; wire into `Game`)

- [ ] **Step 1: Add the `Juice` class**

Insert this block directly after the `FloatingText` class:

```js
  class Juice {
    constructor() {
      this.shakeIntensity = 0;
      this.shakeTime = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.flashColor = null;
      this.flashAlpha = 0;
      this.flashTime = 0;
      this.hitStopTime = 0;
    }

    shake(intensity, duration) {
      this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
      this.shakeTime = Math.max(this.shakeTime, duration);
    }

    hitStop(duration) {
      this.hitStopTime = Math.max(this.hitStopTime, duration);
    }

    flash(color, alpha, duration) {
      this.flashColor = color;
      this.flashAlpha = Math.max(this.flashAlpha, alpha);
      this.flashTime = Math.max(this.flashTime, duration);
    }

    isStopped() {
      return this.hitStopTime > 0;
    }

    update(deltaTime) {
      if (this.shakeTime > 0) {
        this.shakeTime -= deltaTime;
        this.offsetX = (Math.random() * 2 - 1) * this.shakeIntensity;
        this.offsetY = (Math.random() * 2 - 1) * this.shakeIntensity;
        if (this.shakeTime <= 0) {
          this.shakeTime = 0;
          this.shakeIntensity = 0;
          this.offsetX = 0;
          this.offsetY = 0;
        }
      }
      if (this.flashTime > 0) {
        this.flashTime -= deltaTime;
        if (this.flashTime <= 0) {
          this.flashTime = 0;
          this.flashColor = null;
          this.flashAlpha = 0;
        }
      }
      if (this.hitStopTime > 0) {
        this.hitStopTime -= deltaTime;
        if (this.hitStopTime < 0) this.hitStopTime = 0;
      }
    }

    apply(context) {
      if (this.shakeTime > 0) context.translate(this.offsetX, this.offsetY);
    }

    drawFlash(context, width, height) {
      if (this.flashTime > 0 && this.flashColor) {
        context.globalAlpha = this.flashAlpha;
        context.fillStyle = this.flashColor;
        context.fillRect(0, 0, width, height);
        context.globalAlpha = 1;
      }
    }
  }
```

- [ ] **Step 2: Wire into the `Game` constructor**

In the `Game` constructor (`constructor(width, height) { ... }`), add after `this.explosions = [];` (around line 901):

```js
      this.juice = new Juice();
      this.sparks = [];
      this.floatingTexts = [];
```

- [ ] **Step 3: Reset juice on `startGame`**

In `startGame()`, after `this.explosions = [];` add:

```js
      this.juice = new Juice();
      this.sparks = [];
      this.floatingTexts = [];
```

In `goToMenu()`, after `this.explosions = [];` add:

```js
      this.sparks = [];
      this.floatingTexts = [];
```

- [ ] **Step 4: Update sparks and floatingTexts in `Game.update`**

In `Game.update(deltaTime)`, at the very top of the method (before `this.background.update();`), add:

```js
      this.juice.update(deltaTime);
      if (this.juice.isStopped()) return;
```

Then, after the existing `this.explosions = this.explosions.filter(...)` line, add:

```js
      this.sparks.forEach(s => s.update(deltaTime));
      this.sparks = this.sparks.filter(s => !s.markedForDeletion);
      this.floatingTexts.forEach(t => t.update(deltaTime));
      this.floatingTexts = this.floatingTexts.filter(t => !t.markedForDeletion);
```

- [ ] **Step 5: Apply shake + draw flash + draw sparks in `Game.draw`**

Replace the entire `draw(context)` method with:

```js
    draw(context) {
      context.save();
      this.juice.apply(context);
      this.background.draw(context);
      if (this.state !== 'menu') {
        this.player.draw(context);
        this.particles.forEach(p => p.draw(context));
        this.sparks.forEach(s => s.draw(context));
        this.floatingTexts.forEach(t => t.draw(context));
        this.enemies.forEach(e => e.draw(context));
        this.explosions.forEach(e => e.draw(context));
        this.background.layer4.draw(context);
      }
      context.restore();
      this.ui.draw(context);
      if (this.state === 'playing' || this.state === 'paused') {
        this.juice.drawFlash(context, this.width, this.height);
      }
    }
```

- [ ] **Step 6: Syntax check**

Run: `node --check games/steampunk/script.js`
Expected: no output, exit code 0.

- [ ] **Step 7: Commit**

```bash
git add games/steampunk/script.js
git commit -m "feat: add Juice system (shake, hit-stop, flash) wired into Game"
```

---

### Task 3: Firing feedback (projectile trail + glow, muzzle flash, shot shake)

**Files:**
- Modify: `games/steampunk/script.js` (`Projectile` class, `Player` class)

- [ ] **Step 1: Lower projectile sound volume + set default**

In the `Projectile` constructor, after `this.sound.src = 'assets/audios/laseShoot.wav';` add:

```js
      this.sound.volume = 0.22;
```

- [ ] **Step 2: Add projectile trail + glow in `Projectile.draw`**

Replace the existing `draw(context)` method of `Projectile` with:

```js
    draw(context) {
      for (let i = 4; i >= 1; i--) {
        context.globalAlpha = 0.18 / i;
        context.drawImage(this.image, this.x - i * 3, this.y, this.width, this.height);
      }
      context.globalAlpha = 1;
      context.shadowColor = '#7ecfff';
      context.shadowBlur = 8;
      if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x, this.y);
      context.shadowBlur = 0;
    }
```

- [ ] **Step 3: Add muzzle flash + shot shake in `Player`**

Replace the existing `shootTop()` method with:

```js
    shootTop() {
      if (this.game.ammo > 0) {
        const p = new Projectile(this.game, this.x + 80, this.y + 30);
        p.playSound();
        this.projectiles.push(p);
        this.game.ammo--;
        this.spawnMuzzleFlash();
      }
      if (this.powerUp) this.shootBottom();
    }

    spawnMuzzleFlash() {
      for (let i = 0; i < 3; i++) {
        const angle = (Math.random() - 0.5) * 1.1;
        this.game.sparks.push(new Spark(this.game, this.x + 92, this.y + 42, angle, 4 + Math.random() * 2, '#ffd166', 2.4, 130));
      }
      this.game.juice.shake(1.2, 55);
    }
```

- [ ] **Step 4: Syntax check**

Run: `node --check games/steampunk/script.js`
Expected: no output, exit code 0.

- [ ] **Step 5: Manual browser check**

Open `games/steampunk/index.html` in a browser. Start a game and fire several shots.
Expected: muzzle flash sparks at the gun, a fading blue trail behind each projectile, a very subtle screen shake per shot, and quiet laser sound.

- [ ] **Step 6: Commit**

```bash
git add games/steampunk/script.js
git commit -m "feat: add firing feedback (muzzle flash, projectile trail, shot shake)"
```

---

### Task 4: Hit feedback (hit sparks, knockback, damage text, kill hit-stop/flash)

**Files:**
- Modify: `games/steampunk/script.js` (`Enemy` class, `Game` class)

- [ ] **Step 1: Add knockback to `Enemy`**

In the `Enemy` constructor, after `this.maxFrame = 37;` add:

```js
      this.knockX = 0;
```

Replace the `Enemy.update()` body with:

```js
    update() {
      if (this.game.state === 'gameover') {
        this.markedForDeletion = true;
      } else {
        this.x += (this.speedX - this.game.speed) - this.knockX;
      }
      this.knockX *= 0.8;
      if (this.x + this.width < 0) this.markedForDeletion = true;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    }

    applyHit() {
      this.knockX = 6;
    }
```

- [ ] **Step 2: Add a `spawnHitSpark` helper to `Game`**

Add this method to the `Game` class (e.g., right after `addExplosion`):

```js
    spawnHitSpark(x, y) {
      for (let i = 0; i < 6; i++) {
        const angle = (Math.random() - 0.5) * 1.4;
        this.sparks.push(new Spark(this, x, y, angle, 2 + Math.random() * 3, '#ffad33', 2, 120));
      }
    }
```

- [ ] **Step 3: Enhance the projectile-vs-enemy collision branch**

In `Game.update`, inside the `this.player.projectiles.forEach(projectile => { ... })` block, replace the hit logic with:

```js
          if (this.checkCollision(projectile, enemy)) {
            enemy.lives--;
            enemy.applyHit();
            projectile.markedForDeletion = true;
            this.spawnHitSpark(projectile.x + projectile.width, projectile.y + projectile.height * 0.5);
            this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
            if (enemy.lives <= 0) {
              for (let i = 0; i < enemy.score; i++) {
                this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
              }
              enemy.markedForDeletion = true;
              this.addExplosion(enemy);
              if (enemy.type === 'lucky') this.player.enterPowerUp();
              if (enemy.type === 'hive') {
                for (let i = 0; i < 5; i++) {
                  const drone = new Drone(this, enemy.x + Math.random() * this.width * 0.5, enemy.y + Math.random() * this.height * 0.5);
                  drone.speedX *= this.difficultyConfig.enemySpeedMult;
                  drone.lives = Math.max(1, Math.ceil(drone.lives * this.difficultyConfig.enemyLivesMult));
                  drone.score = drone.lives;
                  this.enemies.push(drone);
                }
              }
              this.score += enemy.score;
              this.floatingTexts.push(new FloatingText(this, enemy.x + enemy.width * 0.5, enemy.y, '+' + enemy.score, '#ffd166'));
              if (enemy.type === 'hive') {
                this.juice.hitStop(60);
                this.juice.flash('#ffffff', 0.22, 160);
              } else {
                this.juice.hitStop(45);
              }
              if (this.score >= this.winningScore) this.endGame(true);
            }
          }
```

- [ ] **Step 4: Syntax check**

Run: `node --check games/steampunk/script.js`
Expected: no output, exit code 0.

- [ ] **Step 5: Manual browser check**

Open `games/steampunk/index.html`. Start a game.
Expected: when a projectile strikes an enemy, orange sparks appear, the enemy visibly jolts left, and on kill a gold "+N" floats up from the enemy plus a brief freeze (hit-stop) with a white flash for hive whales. Confirm the game resumes normally afterwards (no permanent freeze).

- [ ] **Step 6: Commit**

```bash
git add games/steampunk/script.js
git commit -m "feat: add hit feedback (sparks, knockback, damage text, hit-stop/flash)"
```

---

### Task 5: Player-damage feedback (red vignette + shake, clearer invincibility flash)

**Files:**
- Modify: `games/steampunk/script.js` (`Game.update` collision branch, `Player.draw`)

- [ ] **Step 1: Add damage flash + shake in player-hit branch**

In `Game.update`, inside the enemy-vs-player collision branch (where `this.lives--;` is called), add after `this.lives--;`:

```js
          this.juice.shake(12, 200);
          this.juice.flash('#e74c3c', 0.42, 220);
```

- [ ] **Step 2: Make the invincibility flash clearer + player glow**

In `Player.draw`, replace the invincibility-flash block:

```js
        if (this.game.invincible && Math.floor(this.game.invincibleTimer / 120) % 2 === 0) {
          context.globalAlpha = 0.25;
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
```

with:

```js
        if (this.game.invincible) {
          if (Math.floor(this.game.invincibleTimer / 120) % 2 === 0) {
            context.globalAlpha = 0.4;
          }
          context.shadowColor = '#7ecfff';
          context.shadowBlur = 14;
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        context.shadowBlur = 0;
```

- [ ] **Step 3: Lower background music volume**

In the `Game` constructor, after `this.sound.loop = true;` add:

```js
      this.sound.volume = 0.5;
```

- [ ] **Step 4: Syntax check**

Run: `node --check games/steampunk/script.js`
Expected: no output, exit code 0.

- [ ] **Step 5: Manual browser check**

Open `games/steampunk/index.html`. Start a game and let an enemy hit the player.
Expected: strong screen shake + a red flash overlay when hit, and a clear blinking cyan glow during invincibility. Confirm the red flash fades out and gameplay continues normally.

- [ ] **Step 6: Commit**

```bash
git add games/steampunk/script.js
git commit -m "feat: add player-damage feedback and clearer invincibility flash"
```

---

### Task 6: Audio tuning + final verification

**Files:**
- Modify: `games/steampunk/script.js` (`Explosion` class)

- [ ] **Step 1: Balance explosion volume**

In the `Explosion` constructor, after `this.sound = new Audio();` add:

```js
      this.sound.volume = 0.35;
```

- [ ] **Step 2: Syntax check**

Run: `node --check games/steampunk/script.js`
Expected: no output, exit code 0.

- [ ] **Step 3: Full integration check**

Run: `node --check games/steampunk/script.js`
Open `games/steampunk/index.html`. Play through at least: menu → start → firing → killing enemies (including a hive whale) → getting hit → pause (`P`/`Esc`) → resume → return to menu (`M` on game over) → restart (`R`).
Expected:
- No permanent hit-stop freeze in any state.
- No leftover shake/flash effects after returning to the menu or restarting.
- Game stays smooth; HUD is not badly shaken (shake is applied to the world only).
- Menu/pause/gameover transitions work as before.

- [ ] **Step 4: Commit**

```bash
git add games/steampunk/script.js
git commit -m "feat: balance explosion audio; finalize game-feel pass"
```

---

## Self-Review Notes

- **Scope:** All changes are confined to `games/steampunk/script.js`. No new assets, no HTML/CSS changes.
- **Consistency:** `Juice` exposes `shake/hitStop/flash/isStopped/update/apply/drawFlash`; `Game` calls `juice.update` (with hit-stop early-return) and `juice.apply`/`juice.drawFlash` around world drawing. `Spark`/`FloatingText` use `update(deltaTime)`/`draw(context)` and `markedForDeletion`, matching `Particle`/`Explosion` conventions and the `game.sparks`/`game.floatingTexts` arrays.
- **Spec coverage:** muzzle flash ✓ (Task 3), projectile trail/glow ✓ (Task 3), hit spark ✓ (Task 4), knockback ✓ (Task 4), hit-stop on kill ✓ (Task 4), floating damage/score text ✓ (Task 4), damage red vignette + shake ✓ (Task 5), clearer invincibility flash + glow ✓ (Task 5), audio volume balance ✓ (Tasks 3/5/6). All five sections of the spec are mapped to a task.
