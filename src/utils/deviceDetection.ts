/**
 * Device detection utilities for biometric authentication
 */

/**
 * Check if the device supports Face ID
 */
export function isFaceIDAvailable(): boolean {
  // Check if we're on iOS and Face ID is available
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  
  if (!isIOS) return false;
  
  // Check for Face ID support through various methods
  // Method 1: Check for TrueDepth camera support (Face ID devices)
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    // Face ID is available on iPhone X and later, iPad Pro (3rd gen) and later
    // We can infer this from screen dimensions and device capabilities
    const screen = window.screen;
    const isIPhoneX = screen.height === 812 && screen.width === 375; // iPhone X/XS
    const isIPhoneXR = screen.height === 896 && screen.width === 414; // iPhone XR/11
    const isIPhoneXMax = screen.height === 896 && screen.width === 414; // iPhone XS Max/11 Pro Max
    const isIPhone12Mini = screen.height === 812 && screen.width === 375; // iPhone 12 mini
    const isIPhone12 = screen.height === 844 && screen.width === 390; // iPhone 12/12 Pro
    const isIPhone12Max = screen.height === 926 && screen.width === 428; // iPhone 12 Pro Max
    const isIPhone13Mini = screen.height === 812 && screen.width === 375; // iPhone 13 mini
    const isIPhone13 = screen.height === 844 && screen.width === 390; // iPhone 13/13 Pro
    const isIPhone13Max = screen.height === 926 && screen.width === 428; // iPhone 13 Pro Max
    const isIPhone14 = screen.height === 844 && screen.width === 390; // iPhone 14
    const isIPhone14Plus = screen.height === 926 && screen.width === 428; // iPhone 14 Plus
    const isIPhone14Pro = screen.height === 852 && screen.width === 393; // iPhone 14 Pro
    const isIPhone14ProMax = screen.height === 932 && screen.width === 430; // iPhone 14 Pro Max
    const isIPhone15 = screen.height === 844 && screen.width === 393; // iPhone 15
    const isIPhone15Plus = screen.height === 926 && screen.width === 430; // iPhone 15 Plus
    const isIPhone15Pro = screen.height === 852 && screen.width === 393; // iPhone 15 Pro
    const isIPhone15ProMax = screen.height === 932 && screen.width === 430; // iPhone 15 Pro Max
    
    // Check for iPad Pro with Face ID (11-inch and 12.9-inch models from 2018 onwards)
    const isIPadPro11 = screen.height === 1194 && screen.width === 834; // iPad Pro 11"
    const isIPadPro129 = screen.height === 1366 && screen.width === 1024; // iPad Pro 12.9"
    
    return isIPhoneX || isIPhoneXR || isIPhoneXMax || isIPhone12Mini || isIPhone12 || 
           isIPhone12Max || isIPhone13Mini || isIPhone13 || isIPhone13Max || 
           isIPhone14 || isIPhone14Plus || isIPhone14Pro || isIPhone14ProMax ||
           isIPhone15 || isIPhone15Plus || isIPhone15Pro || isIPhone15ProMax ||
           isIPadPro11 || isIPadPro129;
  }
  
  return false;
}

/**
 * Check if the device supports Touch ID
 */
export function isTouchIDAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  
  if (!isIOS) return false;
  
  // Touch ID is available on older iOS devices that don't have Face ID
  // This is a simplified check - in a real app you might want more sophisticated detection
  return !isFaceIDAvailable();
}

/**
 * Check if the device supports any biometric authentication
 */
export function isBiometricAvailable(): boolean {
  return isFaceIDAvailable() || isTouchIDAvailable();
}

/**
 * Get the preferred biometric authentication method
 */
export function getPreferredBiometricMethod(): 'face' | 'touch' | 'none' {
  if (isFaceIDAvailable()) return 'face';
  if (isTouchIDAvailable()) return 'touch';
  return 'none';
}

/**
 * Check if we're running in World App
 */
export function isInWorldApp(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for World App specific user agent or other indicators
  const userAgent = window.navigator.userAgent;
  return userAgent.includes('WorldApp') || userAgent.includes('World/');
} 