import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah L.",
    role: "Music Producer",
    quote: "The AudioFlow monitors have completely transformed my mixing process. The clarity is unparalleled at this price point. I'm hearing details I never noticed before.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait"
  },
  {
    name: "Mike T.",
    role: "Podcast Host",
    quote: "I recommended the AudioFlow Podcaster Mic to my entire network. It's plug-and-play, sounds incredible, and looks professional on camera. A game-changer for content creators.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "man portrait"
  },
  {
    name: "Jessica P.",
    role: "Audiophile",
    quote: "I was skeptical about the Pro-X headphones, but they blew me away. The noise-cancelling is top-tier, and the soundstage feels so wide and immersive. My daily commute has never been better.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "woman smiling"
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Loved by Creatives & Enthusiasts</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our customers are saying about their AudioFlow experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 pt-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-secondary/50 border-0 shadow-none">
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-foreground">
                  “{testimonial.quote}”
                </blockquote>
              </CardContent>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
