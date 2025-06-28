import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],template: `
    <div class="landing-container">
      <div class="hero-section">
        <h1>Welcome to Vedic Astrology Learning</h1>
        <p>Discover the ancient wisdom of Vedic Astrology through our comprehensive courses</p>
        <button class="cta-button" (click)="exploreContent()">Explore Courses</button>
      </div>
      
      <!-- Special Offer Section -->
      <div class="offer-section">
        <div class="offer-card">
          <div class="offer-badge">
            <span class="offer-text">Special Offer</span>
            <span class="offer-discount">Limited Time</span>
          </div>
          
          <div class="offer-content">
            <h2>🌟 Basic Course - Yearly Subscription</h2>
            <div class="price-section">
              <span class="currency">₹</span>
              <span class="price">465</span>
              <span class="period">/year</span>
            </div>
            <div class="original-price">
              <span>Regular Price: ₹899</span>
              <span class="savings">Save 48%!</span>
            </div>
            
            <div class="offer-features">
              <div class="feature-item">
                <span class="feature-icon">✨</span>
                <span>Complete Basic Astrology Course</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📚</span>
                <span>27 Nakshatras in-depth study</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🎯</span>
                <span>Interactive lessons & keynotes</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📱</span>
                <span>Mobile & desktop access</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔄</span>
                <span>Lifetime course updates</span>
              </div>
            </div>
            
            <button class="explore-course-btn" (click)="exploreContent()">
              <span>Explore Courses</span>
              <mat-icon>arrow_forward</mat-icon>
            </button>
            
            <div class="offer-guarantee">
              <small>🛡️ 30-day money-back guarantee</small>
            </div>
          </div>
        </div>
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
    
    /* Offer Section Styles */
    .offer-section {
      padding: 60px 20px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .offer-card {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
      border-radius: 24px;
      padding: 40px;
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      position: relative;
      overflow: hidden;
      transform: perspective(1000px) rotateX(2deg);
      transition: all 0.3s ease;
    }
    
    .offer-card:hover {
      transform: perspective(1000px) rotateX(0deg) translateY(-5px);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }
    
    .offer-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4d9de0, #e15759, #ff6b6b);
      background-size: 200% 100%;
      animation: shimmer 3s linear infinite;
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    .offer-badge {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .offer-text {
      background: linear-gradient(135deg, #ff6b6b, #ff8e53);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
    }
    
    .offer-discount {
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .offer-content {
      text-align: center;
    }
    
    .offer-content h2 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 24px 0;
      color: #2d3748;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .price-section {
      display: flex;
      align-items: baseline;
      justify-content: center;
      margin-bottom: 12px;
      font-family: 'Inter', sans-serif;
    }
    
    .currency {
      font-size: 1.8rem;
      font-weight: 600;
      color: #4a5568;
      margin-right: 4px;
    }
    
    .price {
      font-size: 4rem;
      font-weight: 800;
      color: #2d3748;
      line-height: 1;
    }
    
    .period {
      font-size: 1.2rem;
      color: #718096;
      margin-left: 8px;
      font-weight: 500;
    }
    
    .original-price {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-bottom: 32px;
      font-size: 0.95rem;
    }
    
    .original-price span:first-child {
      color: #718096;
      text-decoration: line-through;
    }
    
    .savings {
      background: linear-gradient(135deg, #48bb78, #38a169);
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.85rem;
    }
    
    .offer-features {
      text-align: left;
      margin: 32px 0;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      color: #4a5568;
      font-size: 1rem;
    }
    
    .feature-icon {
      font-size: 1.2rem;
      width: 24px;
      text-align: center;
    }
    
    .explore-course-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 auto 20px auto;
      min-width: 200px;
      justify-content: center;
    }
    
    .explore-course-btn:hover {
      background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
    }
    
    .explore-course-btn:active {
      transform: translateY(0);
    }
    
    .offer-guarantee {
      color: #718096;
      font-size: 0.9rem;
      margin-top: 16px;
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
      
      .offer-section {
        padding: 40px 15px;
      }
      
      .offer-card {
        padding: 30px 20px;
        transform: none;
      }
      
      .offer-card:hover {
        transform: translateY(-3px);
      }
      
      .offer-content h2 {
        font-size: 1.5rem;
      }
      
      .price {
        font-size: 3rem;
      }
      
      .currency {
        font-size: 1.5rem;
      }
      
      .period {
        font-size: 1rem;
      }
      
      .offer-badge {
        flex-direction: column;
        gap: 10px;
        align-items: center;
      }
      
      .explore-course-btn {
        padding: 14px 28px;
        font-size: 1rem;
        min-width: 180px;
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
  showComingSoon = false; // Changed to false since we now have the courses explorer

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize component
  }

  exploreContent(): void {
    // Navigate to the courses explorer page
    this.router.navigate(['/courses']);
  }
}
