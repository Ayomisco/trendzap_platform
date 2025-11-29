"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function CreatorApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    twitterHandle: "",
    twitterFollowers: "",
    category: "",
    bio: "",
    whyJoin: "",
    contentExamples: "",
    agreedToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreedToTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Application submitted successfully! We'll review it within 48 hours.")
    setIsSubmitting(false)

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      twitterHandle: "",
      twitterFollowers: "",
      category: "",
      bio: "",
      whyJoin: "",
      contentExamples: "",
      agreedToTerms: false,
    })
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="glass p-6 lg:p-8 sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Creator Application</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            required
            className="glass bg-card/50 border-white/10"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            className="glass bg-card/50 border-white/10"
          />
        </div>

        {/* Twitter Handle */}
        <div className="space-y-2">
          <Label htmlFor="twitterHandle">
            Twitter Handle <span className="text-red-500">*</span>
          </Label>
          <Input
            id="twitterHandle"
            placeholder="@johndoe"
            value={formData.twitterHandle}
            onChange={(e) => handleChange("twitterHandle", e.target.value)}
            required
            className="glass bg-card/50 border-white/10"
          />
        </div>

        {/* Followers */}
        <div className="space-y-2">
          <Label htmlFor="followers">
            Twitter Followers <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.twitterFollowers} onValueChange={(v) => handleChange("twitterFollowers", v)}>
            <SelectTrigger className="glass bg-card/50 border-white/10">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1k-5k">1,000 - 5,000</SelectItem>
              <SelectItem value="5k-10k">5,000 - 10,000</SelectItem>
              <SelectItem value="10k-50k">10,000 - 50,000</SelectItem>
              <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
              <SelectItem value="100k+">100,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">
            Content Category <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.category} onValueChange={(v) => handleChange("category", v)}>
            <SelectTrigger className="glass bg-card/50 border-white/10">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="crypto">Crypto & Web3</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="news">News & Politics</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">
            Short Bio <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself and your content..."
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            required
            rows={3}
            className="glass bg-card/50 border-white/10 resize-none"
          />
        </div>

        {/* Why Join */}
        <div className="space-y-2">
          <Label htmlFor="whyJoin">
            Why do you want to join PulseMarket? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="whyJoin"
            placeholder="Share your motivation..."
            value={formData.whyJoin}
            onChange={(e) => handleChange("whyJoin", e.target.value)}
            required
            rows={3}
            className="glass bg-card/50 border-white/10 resize-none"
          />
        </div>

        {/* Content Examples */}
        <div className="space-y-2">
          <Label htmlFor="contentExamples">Content Examples (URLs)</Label>
          <Textarea
            id="contentExamples"
            placeholder="Share links to your best tweets or content..."
            value={formData.contentExamples}
            onChange={(e) => handleChange("contentExamples", e.target.value)}
            rows={3}
            className="glass bg-card/50 border-white/10 resize-none"
          />
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            checked={formData.agreedToTerms}
            onCheckedChange={(checked) => handleChange("agreedToTerms", checked)}
          />
          <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
            I agree to the PulseMarket Terms of Service and Creator Agreement, and confirm that all information provided
            is accurate
          </Label>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full gradient-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting Application...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Applications are typically reviewed within 48 hours. You'll receive an email with the decision.
        </p>
      </form>
    </Card>
  )
}
