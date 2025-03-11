export interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }
  
  export const createParticle = (x: number, y: number): Particle => ({
    x,
    y,
    size: Math.random() * 5 + 1,
    speedX: Math.random() * 4 - 2,
    speedY: Math.random() * 4 - 2,
    opacity: Math.random() * 0.5 + 0.3
  });
  
  export const updateParticle = (particle: Particle): Particle => ({
    ...particle,
    x: particle.x + particle.speedX,
    y: particle.y + particle.speedY,
    opacity: Math.max(0, particle.opacity - 0.01)
  });