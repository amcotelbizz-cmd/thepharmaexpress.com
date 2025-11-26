"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin, Clock, Send, User, Building2 } from "lucide-react"

export default function ContactForm() {
  const { cart } = useCart()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    inquiryType: "",
    preferredContact: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) newErrors.phone = "Phone number is invalid"
    if (!formData.inquiryType) newErrors.inquiryType = "Please select an inquiry type"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the highlighted fields and try again.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create form data to send to Google Sheets
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('company', formData.company || 'Not provided');
      formDataToSend.append('subject', formData.subject || 'Contact Form Inquiry');
      formDataToSend.append('inquiryType', formData.inquiryType);
      formDataToSend.append('preferredContact', formData.preferredContact || 'Not specified');
      
      // Use the product interest message if the message field is empty
      const messageToSend = formData.message || productInterestMessage;
      formDataToSend.append('message', messageToSend);
      
      // Add cart items if any
      if (cart.length > 0) {
        const cartItems = cart.map(item => `${item.product.name} (${item.variation}) x${item.quantity}`).join(", ");
        formDataToSend.append('cartItems', cartItems);
      } else {
        formDataToSend.append('cartItems', 'No items in cart');
      }
      
      // Submit to Google Sheets via our API endpoint
      const response = await fetch('/api/google-form-proxy', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const result = await response.json();
      
      // Check for errors in the response
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong with your submission');
      }
      
      // Check if the submission was successful - this works with our updated handler
      if (result.success === false) {
        throw new Error(result.message || 'Form submission failed');
      }
      
      console.log('Form submission successful:', result);
      
      toast({
        title: "Inquiry Submitted Successfully!",
        description: "Thank you for your inquiry. Our team will contact you within 24 hours.",
      })
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        inquiryType: "",
        preferredContact: "",
        message: "",
      })
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
      
      // You might want to log this error to your monitoring system
    } finally {
      setIsSubmitting(false);
    }
  }

  // Generate product interest message based on cart
  const productInterestMessage =
    cart.length > 0
      ? `I'm interested in the following products: ${cart.map((item) => `${item.product.name} (${item.variation}) x${item.quantity}`).join(", ")}.`
      : ""
      
  // Initialize the message field with product interest message when cart changes
  useEffect(() => {
    if (cart.length > 0 && !formData.message) {
      setFormData(prev => ({
        ...prev,
        message: productInterestMessage
      }));
    }
  }, [cart.length, productInterestMessage]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Contact Information Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center mb-3">
            <Phone className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-semibold text-gray-900">Phone</h3>
          </div>
          <p className="text-gray-600">1 (999) 999-9999</p>
          <p className="text-sm text-gray-500 mt-1">Mon-Fri: 9AM-6PM EST</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center mb-3">
            <Mail className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-semibold text-gray-900">Email</h3>
          </div>
          <p className="text-gray-600">sales@thepharmaexpress.com</p>
          <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center mb-3">
            <MapPin className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-semibold text-gray-900">Address</h3>
          </div>
          <p className="text-gray-600">ABC_ADDRESS_LINE.</p>
          <p className="text-gray-600">Suite 102, Burbank CA 91506</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-gray-600">Send us your inquiry and we'll get back to you as soon as possible.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                <User className="h-4 w-4 mr-1" />
                Full Name <span className="text-red-500 ml-1">*</span>
              </label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
                placeholder="Enter your full name"
                required 
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                Email Address <span className="text-red-500 ml-1">*</span>
              </label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
                placeholder="Enter your email address"
                required 
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                Phone Number <span className="text-red-500 ml-1">*</span>
              </label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                value={formData.phone} 
                onChange={handleChange}
                className={errors.phone ? "border-red-500" : ""}
                placeholder="(555) 123-4567"
                required 
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-gray-700 flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                Company (Optional)
              </label>
              <Input 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleChange}
                placeholder="Enter your company name"
              />
            </div>
          </div>

          {/* Inquiry Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="inquiryType" className="text-sm font-medium text-gray-700">
                Inquiry Type <span className="text-red-500 ml-1">*</span>
              </label>
              <Select onValueChange={(value) => handleSelectChange("inquiryType", value)}>
                <SelectTrigger className={errors.inquiryType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                  <SelectItem value="prescription">Prescription Question</SelectItem>
                  <SelectItem value="order-support">Order Support</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="medical-consultation">Medical Consultation</SelectItem>
                  <SelectItem value="general">General Question</SelectItem>
                </SelectContent>
              </Select>
              {errors.inquiryType && <p className="text-red-500 text-sm">{errors.inquiryType}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="preferredContact" className="text-sm font-medium text-gray-700">
                Preferred Contact Method
              </label>
              <Select onValueChange={(value) => handleSelectChange("preferredContact", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="text">Text Message</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-gray-700">
              Subject
            </label>
            <Input 
              id="subject" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange}
              placeholder="Brief description of your inquiry"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message || productInterestMessage}
              onChange={handleChange}
              placeholder="Please provide information about your inquiry, including any specific questions or requirements."
            />
          </div>

          {cart.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                <p className="font-medium text-gray-900">Cart Items Included</p>
              </div>
              <p className="text-sm text-gray-600">
                Your current cart items will be automatically included in your inquiry for faster assistance.
              </p>
              <div className="mt-2 text-sm text-gray-500">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.product.name} ({item.variation})</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Inquiry
              </>
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500">
              By submitting this form, you agree to be contacted by our team regarding your inquiry.
            </p>
            <p className="text-xs text-gray-500">
              We typically respond within 24 hours during business days.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
