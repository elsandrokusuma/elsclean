import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    name: "AudioFlow Pro-X Headphones",
    price: "$299",
    image: "https://placehold.co/600x600.png",
    imageHint: "sleek headphones",
    specs: ["50mm Drivers", "Noise-Cancelling", "20-Hour Battery", "Bluetooth 5.2"],
    badge: "Best Seller",
  },
  {
    name: "AudioFlow Studio Monitors",
    price: "$499",
    image: "https://placehold.co/600x600.png",
    imageHint: "studio speakers",
    specs: ["5-inch Woofer", "1-inch Tweeter", "Flat Response", "XLR/TRS Inputs"],
    badge: "New Arrival",
  },
  {
    name: "AudioFlow Podcaster Mic",
    price: "$149",
    image: "https://placehold.co/600x600.png",
    imageHint: "podcast microphone",
    specs: ["Cardioid Pattern", "USB-C", "Zero-Latency Monitoring", "Built-in Pop Filter"],
  },
  {
    name: "AudioFlow Go-TWS Earbuds",
    price: "$129",
    image: "https://placehold.co/600x600.png",
    imageHint: "wireless earbuds",
    specs: ["True Wireless", "Active Noise-Cancelling", "8-Hour Battery", "IPX5 Water-Resistant"],
  },
];

export default function Catalog() {
  return (
    <section id="catalog" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Premier Collection</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our curated selection of high-fidelity audio equipment, designed for enthusiasts and professionals alike.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.name} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
              <CardHeader className="relative p-0">
                <Image
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                  height={600}
                  src={product.image}
                  width={600}
                  data-ai-hint={product.imageHint}
                />
                {product.badge && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">{product.badge}</Badge>
                )}
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-2xl font-semibold text-primary mt-2">{product.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-center">
                      <svg className="mr-2 h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {spec}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
