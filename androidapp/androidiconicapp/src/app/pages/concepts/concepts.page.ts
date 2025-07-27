import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { ConceptService, AstrologyConcept, ConceptCategory, ConceptSubcategory } from '../../services/concept.service';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.page.html',
  styleUrls: ['./concepts.page.scss'],
})
export class ConceptsPage implements OnInit, OnDestroy {
  currentUser: User | null = null;
  allConcepts: AstrologyConcept[] = [];
  filteredConcepts: AstrologyConcept[] = [];
  selectedCategory = 'all';
  selectedSubcategory = 'all';
  selectedCourseType = 'all';
  searchTerm = '';
  categories: ConceptCategory[] = [];
  subcategories: ConceptSubcategory[] = [];
  courseTypes = [
    { value: 'all', label: 'எல்லாம் (All)', labelEnglish: 'All' },
    { value: 'free', label: 'இலவசம் (Free)', labelEnglish: 'Free' },
    { value: 'paid', label: 'கட்டணம் (Paid)', labelEnglish: 'Paid' },
    { value: 'beginner', label: 'ஆரம்பம் (Beginner)', labelEnglish: 'Beginner' },
    { value: 'intermediate', label: 'நடுத்தர (Intermediate)', labelEnglish: 'Intermediate' },
    { value: 'advanced', label: 'மேம்பட்ட (Advanced)', labelEnglish: 'Advanced' }
  ];

  // Promotional Carousel Properties
  currentPromoIndex = 0;
  promoSlides = [
    {
      id: 'new_courses',
      title: 'புதிய பாடப்பிரிவுகள்',
      titleEnglish: 'New Courses Added',
      description: 'DNA ஜோதிடம் மற்றும் நட்சத்திர பரிகாரங்கள் இப்போது கிடைக்கின்றன!',
      descriptionEnglish: 'Explore DNA Astrology and Nakshatra Remedies now available!',
      icon: 'sparkles',
      color: 'tertiary',
      badge: 'புதிதாக!'
    },
    {
      id: 'special_offer',
      title: 'சிறப்பு வழங்கல்',
      titleEnglish: 'Special Offer',
      description: '50% தள்ளுபடி - அனைத்து பிரீமியம் கோர்ஸ்களுக்கும்!',
      descriptionEnglish: '50% OFF on all Premium Courses - Limited Time!',
      icon: 'gift',
      color: 'danger',
      badge: '50% OFF'
    },
    {
      id: 'free_consultation',
      title: 'இலவச ஆலோசனை',
      titleEnglish: 'Free Consultation',
      description: 'நிபுணர்களுடன் 15 நிமிட இலவச ஆலோசனை பெறுங்கள்',
      descriptionEnglish: 'Get 15-min free consultation with expert astrologers',
      icon: 'call',
      color: 'success',
      badge: 'இலவசம்!'
    }
  ];
  private promoInterval: any;

  constructor(
    private authService: AuthService,
    private conceptService: ConceptService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Subscribe to current user
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.updateConceptsPurchaseStatus();
    });

    // Load categories
    this.conceptService.getCategories().subscribe(categories => {
      this.categories = [
        { id: 'all', name: 'எல்லாம்', nameEnglish: 'All', icon: 'apps', color: '#666' },
        ...categories
      ];
    });

    // Load concepts
    this.conceptService.getConcepts().subscribe(concepts => {
      this.allConcepts = concepts;
      this.updateConceptsPurchaseStatus();
      this.filterConcepts();
    });

    // Start promotional carousel
    this.startPromoCarousel();
  }

  ngOnDestroy() {
    if (this.promoInterval) {
      clearInterval(this.promoInterval);
    }
  }

  startPromoCarousel() {
    this.promoInterval = setInterval(() => {
      this.currentPromoIndex = (this.currentPromoIndex + 1) % this.promoSlides.length;
    }, 4000); // Change slide every 4 seconds
  }

  goToPromoSlide(index: number) {
    this.currentPromoIndex = index;
    // Restart the auto-rotation
    if (this.promoInterval) {
      clearInterval(this.promoInterval);
      this.startPromoCarousel();
    }
  }

  onPromoClick(slide: any) {
    switch (slide.id) {
      case 'new_courses':
        // Show new courses or navigate to specific section
        this.selectedCategory = 'all';
        this.searchTerm = 'DNA';
        this.filterConcepts();
        break;
      case 'special_offer':
        // Navigate to paid courses
        this.selectedCourseType = 'paid';
        this.filterConcepts();
        break;
      case 'free_consultation':
        // Navigate to contact or booking page
        this.router.navigate(['/contact']);
        break;
    }
  }

  updateConceptsPurchaseStatus() {
    this.allConcepts = this.allConcepts.map(concept => ({
      ...concept,
      isPurchased: this.currentUser?.purchasedConcepts.includes(concept.id) || false
    }));
  }

  filterConcepts() {
    let filtered = [...this.allConcepts];

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(concept => concept.category === this.selectedCategory);
    }

    // Filter by subcategory (if selected)
    if (this.selectedSubcategory !== 'all' && this.selectedSubcategory) {
      filtered = filtered.filter(concept => concept.subcategory === this.selectedSubcategory);
    }

    // Filter by course type
    if (this.selectedCourseType !== 'all') {
      switch (this.selectedCourseType) {
        case 'free':
          filtered = filtered.filter(concept => !concept.isPaid);
          break;
        case 'paid':
          filtered = filtered.filter(concept => concept.isPaid);
          break;
        case 'beginner':
          filtered = filtered.filter(concept => concept.level === 'ஆரம்பம்');
          break;
        case 'intermediate':
          filtered = filtered.filter(concept => concept.level === 'நடுத்தர');
          break;
        case 'advanced':
          filtered = filtered.filter(concept => concept.level === 'மேம்பட்ட');
          break;
      }
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchTerm = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(concept =>
        concept.title.toLowerCase().includes(searchTerm) ||
        concept.titleEnglish.toLowerCase().includes(searchTerm) ||
        concept.description.toLowerCase().includes(searchTerm) ||
        concept.descriptionEnglish.toLowerCase().includes(searchTerm) ||
        concept.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    this.filteredConcepts = filtered;
  }

  onCategoryChange() {
    this.selectedSubcategory = 'all';
    
    // Load subcategories if Panchangam is selected
    if (this.selectedCategory === 'பஞ்சாங்கம்') {
      this.subcategories = this.conceptService.getSubcategoriesByCategory('panchangam');
    } else {
      this.subcategories = [];
    }
    
    this.filterConcepts();
  }

  onSubcategoryChange() {
    this.filterConcepts();
  }

  onCourseTypeChange() {
    this.filterConcepts();
  }

  onSearchChange() {
    this.filterConcepts();
  }

  getSelectedCourseTypeLabel(): string {
    const selectedType = this.courseTypes.find(type => type.value === this.selectedCourseType);
    return selectedType ? selectedType.label : '';
  }

  async onConceptClick(concept: AstrologyConcept) {
    if (!concept.isPaid || this.hasAccess(concept)) {
      // Navigate to specific concept module based on concept ID
      switch (concept.id) {
        case 'tantrik_001':
          this.router.navigate(['/tantrik-pariharam']);
          break;
        case 'dna_001':
          this.router.navigate(['/dna-astrology']);
          break;
        default:
          // Navigate to generic concept content page
          this.router.navigate(['/concept', concept.id]);
          break;
      }
    } else {
      // Show purchase options
      await this.showPurchaseOptions(concept);
    }
  }

  hasAccess(concept: AstrologyConcept): boolean {
    if (!this.currentUser) return false;
    return this.authService.hasAccessToConcept(concept.id);
  }

  async showPurchaseOptions(concept: AstrologyConcept) {
    const actionSheet = await this.actionSheetController.create({
      header: `${concept.title} - ₹${concept.price}`,
      subHeader: concept.description,
      buttons: [
        {
          text: `Purchase for ₹${concept.price}`,
          icon: 'card',
          handler: () => {
            this.purchaseConcept(concept);
          }
        },
        {
          text: 'Preview',
          icon: 'eye',
          handler: () => {
            this.previewConcept(concept);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async purchaseConcept(concept: AstrologyConcept) {
    const alert = await this.alertController.create({
      header: 'Purchase Confirmation',
      message: `Are you sure you want to purchase "${concept.title}" for ₹${concept.price}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Purchase',
          handler: () => {
            // Simulate purchase
            this.authService.purchaseConcept(concept.id);
            this.conceptService.markConceptAsPurchased(concept.id);
            
            // Update local state
            concept.isPurchased = true;
            
            this.showPurchaseSuccess(concept);
          }
        }
      ]
    });
    await alert.present();
  }

  async showPurchaseSuccess(concept: AstrologyConcept) {
    const alert = await this.alertController.create({
      header: 'Purchase Successful!',
      message: `You now have access to "${concept.title}". Enjoy learning!`,
      buttons: [
        {
          text: 'Start Learning',
          handler: () => {
            this.router.navigate(['/concept', concept.id]);
          }
        }
      ]
    });
    await alert.present();
  }

  previewConcept(concept: AstrologyConcept) {
    // Navigate to concept preview
    this.router.navigate(['/concept', concept.id], { queryParams: { preview: true } });
  }

  async presentUserMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: this.currentUser?.name || 'User Menu',
      buttons: [
        {
          text: 'Profile',
          icon: 'person',
          handler: () => {
            this.router.navigate(['/profile']);
          }
        },
        {
          text: 'My Purchases',
          icon: 'bag',
          handler: () => {
            this.router.navigate(['/purchases']);
          }
        },
        {
          text: 'Settings',
          icon: 'settings',
          handler: () => {
            this.router.navigate(['/settings']);
          }
        },
        {
          text: 'Logout',
          icon: 'log-out',
          role: 'destructive',
          handler: () => {
            this.logout();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getConceptStatusIcon(concept: AstrologyConcept): string {
    if (!concept.isPaid) return 'gift';
    if (this.hasAccess(concept)) return 'checkmark-circle';
    return 'lock-closed';
  }

  getConceptStatusColor(concept: AstrologyConcept): string {
    if (!concept.isPaid) return 'success';
    if (this.hasAccess(concept)) return 'primary';
    return 'medium';
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToPurchases() {
    this.router.navigate(['/purchases']);
  }
}
