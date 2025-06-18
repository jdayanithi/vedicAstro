import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <div class="landing-container">
      <div class="hero-section">
        <h1>Welcome to Vedic Astrology Learning</h1>
        <p>Discover the ancient wisdom of Vedic Astrology through our comprehensive courses</p>
        <button class="cta-button" (click)="exploreContent()">Explore Courses</button>
      </div>
      
      <div class="features-section">
        <div class="feature-card">
          <h3>🌟 Ancient Wisdom</h3>
          <p>Learn from thousands of years of astrological knowledge</p>
        </div>
        <div class="feature-card">
          <h3>📚 Structured Learning</h3>
          <p>Progressive courses designed for all skill levels</p>
        </div>
        <div class="feature-card">
          <h3>🎯 Expert Guidance</h3>
          <p>Learn from experienced practitioners and teachers</p>
        </div>
      </div>
      
      <div class="coming-soon" *ngIf="showComingSoon">
        <h2>Advanced Course Browser Coming Soon!</h2>
        <p>We're working on an interactive course explorer with detailed lessons, keynotes, and personalized learning paths.</p>
      </div>
    </div>
  `,
  styles: [`
    .landing-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 0;
      margin: 0;
    }
    
    .hero-section {
      text-align: center;
      padding: 100px 20px 80px;
      color: white;
    }
    
    .hero-section h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin: 0 0 20px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .hero-section p {
      font-size: 1.3rem;
      margin: 0 0 40px 0;
      opacity: 0.9;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .cta-button {
      background: #ff6b6b;
      color: white;
      border: none;
      padding: 16px 32px;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
    }
    
    .cta-button:hover {
      background: #ff5252;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
    }
    
    .features-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding: 60px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .feature-card {
      background: rgba(255, 255, 255, 0.95);
      padding: 40px 30px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transition: transform 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-card h3 {
      font-size: 1.5rem;
      margin: 0 0 16px 0;
      color: #333;
    }
    
    .feature-card p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }
    
    .coming-soon {
      background: rgba(255, 255, 255, 0.1);
      margin: 40px 20px;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      color: white;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .coming-soon h2 {
      margin: 0 0 16px 0;
      font-size: 2rem;
    }
    
    .coming-soon p {
      margin: 0;
      font-size: 1.1rem;
      opacity: 0.9;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
    
    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2.5rem;
      }
      
      .hero-section p {
        font-size: 1.1rem;
      }
      
      .features-section {
        grid-template-columns: 1fr;
        padding: 40px 20px;
      }
      
      .coming-soon {
        margin: 20px 10px;
        padding: 30px 20px;
      }
      
      .coming-soon h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class LandingComponent implements OnInit {
  showComingSoon = true;

  constructor() {}

  ngOnInit(): void {
    // Initialize component
  }

  exploreContent(): void {
    // For now, just show a message
    alert('Course explorer coming soon! This will show interactive courses with lessons, keynotes, and learning paths.');
  }
}
