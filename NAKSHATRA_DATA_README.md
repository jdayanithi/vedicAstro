# 27 Nakshatras Sample Data Implementation

## Overview
This implementation provides comprehensive sample data for all 27 Nakshatras (Natchthiram) in the Vedic Astrology learning system. The data is structured across all tables to provide a complete learning experience.

## Data Structure

### 1. Categories (5 entries)
- **Vedic Astrology** (Parent Category)
  - **Nakshatras** - 27 Lunar Mansions
  - **Basic Learning** - Fundamental concepts  
  - **Advanced Studies** - Advanced techniques
  - **Predictive Astrology** - Prediction methods

### 2. Tags (12 entries)
- Nakshatra, Deity, Symbol, Characteristics
- Mythology, Remedies, Compatibility, Career
- Health, Spiritual, Timing, Prediction

### 3. Courses (4 entries)
- **Complete Nakshatra Course** (40 hours, $299.99)
- **Beginner Vedic Astrology** (30 hours, $199.99)
- **Nakshatra Compatibility** (20 hours, $149.99)
- **Predictive Astrology with Nakshatras** (35 hours, $399.99)

### 4. Topics (10 entries)
- Introduction to Nakshatras
- Nakshatra Characteristics  
- Nakshatra Deities and Symbols
- Nakshatra Mythology
- Nakshatra Remedies
- Birth Star Analysis
- Nakshatra Compatibility
- Nakshatra Timing
- Career Guidance through Nakshatras
- Health Predictions

### 5. Lessons (27 entries - All Nakshatras)
Each Nakshatra lesson includes:
- **Name and Meaning** (e.g., "Ashwini - The Horse Riders")
- **Ruling Deity** (e.g., Ashwini Kumaras)
- **Symbol** (e.g., Horse Head)
- **Ruling Planet** (e.g., Ketu)
- **Description** with key characteristics
- **45-minute duration** each
- **Sequential ordering** (1-27)

#### Complete List of 27 Nakshatras:
1. **Ashwini** - Horse Riders (Ashwini Kumaras, Ketu)
2. **Bharani** - Bearer (Yama, Venus)
3. **Krittika** - Cutter (Agni, Sun)
4. **Rohini** - Red One (Brahma, Moon)
5. **Mrigashira** - Deer Head (Soma, Mars)
6. **Ardra** - Moist One (Rudra, Rahu)
7. **Punarvasu** - Returner (Aditi, Jupiter)
8. **Pushya** - Nourisher (Brihaspati, Saturn)
9. **Ashlesha** - Embracer (Nagas, Mercury)
10. **Magha** - Mighty (Pitrs, Ketu)
11. **Purva Phalguni** - Former Red One (Bhaga, Venus)
12. **Uttara Phalguni** - Latter Red One (Aryaman, Sun)
13. **Hasta** - Hand (Savitar, Moon)
14. **Chitra** - Bright One (Tvashtar, Mars)
15. **Swati** - Sword (Vayu, Rahu)
16. **Vishakha** - Forked (Indra-Agni, Jupiter)
17. **Anuradha** - Follower (Mitra, Saturn)
18. **Jyeshtha** - Eldest (Indra, Mercury)
19. **Mula** - Root (Niriti, Ketu)
20. **Purva Ashadha** - Former Invincible (Apas, Venus)
21. **Uttara Ashadha** - Latter Invincible (Vishvedevas, Sun)
22. **Shravana** - Listener (Vishnu, Moon)
23. **Dhanishtha** - Richest (Vasus, Mars)
24. **Shatabhisha** - Hundred Healers (Varuna, Rahu)
25. **Purva Bhadrapada** - Former Lucky Feet (Aja Ekapada, Jupiter)
26. **Uttara Bhadrapada** - Latter Lucky Feet (Ahir Budhnya, Saturn)
27. **Revati** - Wealthy (Pushan, Mercury)

### 6. Keynotes (Detailed Information)
Each Nakshatra has multiple keynotes covering:
- **Key Characteristics** (Deity, Symbol, Planet, Element, etc.)
- **Personality Traits** 
- **Career & Health Guidance**
- **Practical Applications**

### 7. Lesson Tags (Many-to-Many Relationships)
- Links lessons with relevant tags
- Enables filtering and searching
- Categorizes content by themes

### 8. Notifications (4 broadcast messages)
- Welcome messages for new users
- Course updates and reminders
- Monthly predictions and guidance

## Database Files Created

### 1. Migration File
- **Location**: `src/main/resources/db/migration/V11__Insert_nakshatra_sample_data.sql`
- **Purpose**: Auto-executes when application starts
- **Content**: Complete data for all tables

### 2. Manual Execution File  
- **Location**: `src/main/resources/sample_nakshatra_data.sql`
- **Purpose**: For manual database population
- **Content**: Complete sample data set

### 3. Quick Sample File
- **Location**: `src/main/resources/quick_sample_data.sql`
- **Purpose**: Essential data for testing
- **Content**: First 5 Nakshatras for quick setup

## How to Use

### Option 1: Automatic (Recommended)
1. Start the Spring Boot application
2. Flyway will automatically execute the V11 migration
3. All sample data will be populated

### Option 2: Manual Execution
1. Connect to your database
2. Execute the `sample_nakshatra_data.sql` file
3. Or execute the `quick_sample_data.sql` for basic testing

## Features Included

### ✅ Complete Nakshatra Information
- All 27 Nakshatras with authentic details
- Deity, Symbol, Planet, and characteristics
- Practical applications for each

### ✅ Structured Learning Path
- Organized by categories and topics
- Progressive difficulty levels
- Tagged content for easy navigation

### ✅ Rich Content
- Detailed descriptions for each Nakshatra
- Keynotes with practical information
- Career and health guidance

### ✅ Interactive Elements
- Broadcast notifications for engagement
- Course structure for systematic learning
- Tag-based content organization

## Educational Value

This dataset provides:
- **Authentic Vedic Knowledge** - Based on traditional texts
- **Practical Applications** - Career, health, and compatibility guidance  
- **Systematic Learning** - Structured progression from basic to advanced
- **Interactive Experience** - Tags, notifications, and organized content

## Technical Implementation

- **Database Normalization** - Proper relationships between tables
- **Data Integrity** - Foreign key constraints and status flags
- **Scalability** - Easy to add more content and features
- **Search Optimization** - Tagged content for efficient filtering

The implementation provides a solid foundation for a comprehensive Vedic Astrology learning platform focused on the 27 Nakshatras system.
