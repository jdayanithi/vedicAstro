import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextUtilsService {

  constructor() { }

  /**
   * Highlights words that start content and end with a colon
   * @param content The text content to process
   * @returns HTML string with highlighted colon words
   */
  highlightColonWords(content: string): string {
    if (!content) return content;
    
    // Regex to match the first word ending with colon
    const colonPattern = /^([^:]+:)/;
    const match = content.match(colonPattern);
    
    if (match) {
      const firstWord = match[1];
      const restOfContent = content.substring(firstWord.length);
      return `<strong class="colon-highlight">${firstWord}</strong>${restOfContent}`;
    }
    
    return content;
  }

  /**
   * Enhanced version that can handle multiple patterns and custom classes
   * @param content The text content to process
   * @param options Configuration options for highlighting
   * @returns HTML string with highlighted terms
   */
  highlightTerms(content: string, options?: {
    colonClass?: string;
    highlightMultiple?: boolean;
    customPatterns?: RegExp[];
  }): string {
    if (!content) return content;
    
    const config = {
      colonClass: 'colon-highlight',
      highlightMultiple: false,
      customPatterns: [],
      ...options
    };

    // Default colon pattern
    const colonPattern = /^([^:]+:)/;
    const match = content.match(colonPattern);
    
    if (match) {
      const firstWord = match[1];
      const restOfContent = content.substring(firstWord.length);
      return `<strong class="${config.colonClass}">${firstWord}</strong>${restOfContent}`;
    }

    // Apply custom patterns if provided
    if (config.customPatterns.length > 0) {
      let processedContent = content;
      config.customPatterns.forEach(pattern => {
        processedContent = processedContent.replace(pattern, '<mark>$1</mark>');
      });
      return processedContent;
    }
    
    return content;
  }

  /**
   * Sanitizes HTML content to prevent XSS attacks
   * @param content The HTML content to sanitize
   * @returns Sanitized HTML string
   */
  sanitizeHtml(content: string): string {
    // Basic sanitization - in production, use a proper sanitization library
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');
  }

  /**
   * Truncates text to specified length with ellipsis
   * @param text The text to truncate
   * @param maxLength Maximum length before truncation
   * @param suffix Suffix to add when truncated (default: '...')
   * @returns Truncated text string
   */
  truncateText(text: string, maxLength: number, suffix: string = '...'): string {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + suffix;
  }

  /**
   * Extracts Tamil terms that commonly start content sections
   * @param content The content to analyze
   * @returns Array of found Tamil terms
   */
  extractTamilTerms(content: string): string[] {
    const tamilTerms = [
      'பொருள்:',
      'எண்ணிக்கை:',
      'விளக்கம்:',
      'தொடர்பு:',
      'முக்கியத்துவம்:',
      'பாவங்களின் பிரிவுகள்:',
      'உதாரணம்:',
      'குறிப்பு:'
    ];

    return tamilTerms.filter(term => content.includes(term));
  }
}
