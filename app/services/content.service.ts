// =============================================================================
// Content service — the single read API for structural site content.
// Components/composables call these instead of importing config directly, so
// the content source (config today, CMS/API tomorrow) can change in one place.
// =============================================================================
import { brandConfig, socialLinks } from '~/config/brand.config'
import {
  complianceItems,
  footerExploreNav,
  footerLegalNav,
  mainNav,
} from '~/config/navigation.config'
import {
  marqueeBrands,
  processSteps,
  testimonials,
  valueProps,
} from '~/config/site.config'
import type {
  ComplianceItem,
  NavItem,
  ProcessStep,
  SocialLink,
  Testimonial,
  ValueProp,
} from '~/types'

export const contentService = {
  getBrand() {
    return brandConfig
  },
  getMainNav(): readonly NavItem[] {
    return mainNav
  },
  getFooterExploreNav(): readonly NavItem[] {
    return footerExploreNav
  },
  getFooterLegalNav(): readonly NavItem[] {
    return footerLegalNav
  },
  getComplianceItems(): readonly ComplianceItem[] {
    return complianceItems
  },
  getValueProps(): readonly ValueProp[] {
    return valueProps
  },
  getProcessSteps(): readonly ProcessStep[] {
    return processSteps
  },
  getTestimonials(): readonly Testimonial[] {
    return testimonials
  },
  getMarqueeBrands(): readonly string[] {
    return marqueeBrands
  },
  getSocialLinks(): readonly SocialLink[] {
    return socialLinks
  },
}
