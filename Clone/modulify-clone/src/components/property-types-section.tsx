import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function PropertyTypesSection() {
  return (
    <section id="Property-Types-Section" className="bg-gray-50 py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Premium property listings ready to explore
          </h2>
          <p className="text-gray-600 mb-8">
            Discover your perfect property by category
          </p>
        </div>

        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="flex flex-wrap justify-center mb-10 border-b border-gray-200 w-full">
            <TabsTrigger value="residential" className="px-4 py-2 text-gray-600 hover:text-modulify-blue">
              Residential
            </TabsTrigger>
            <TabsTrigger value="commercial" className="px-4 py-2 text-gray-600 hover:text-modulify-blue">
              Commercial
            </TabsTrigger>
            <TabsTrigger value="luxury" className="px-4 py-2 text-gray-600 hover:text-modulify-blue">
              Luxury Estates
            </TabsTrigger>
            <TabsTrigger value="international" className="px-4 py-2 text-gray-600 hover:text-modulify-blue">
              International
            </TabsTrigger>
            <TabsTrigger value="investment" className="px-4 py-2 text-gray-600 hover:text-modulify-blue">
              Investment
            </TabsTrigger>
            <TabsTrigger value="vacation" className="px-4 py-2 text-gray-600 hover:text-modulify-blue">
              Vacation
            </TabsTrigger>
            <TabsTrigger value="new-developments" className="px-4 py-2 text-gray-600 hover:text-modulify-blue">
              New Developments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="residential" className="mt-8">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <div className="w-full h-96 bg-gradient-primary flex items-center justify-center text-white">
                  <div className="text-center max-w-xl mx-auto p-8">
                    <h3 className="text-3xl font-bold mb-4">Exceptional homes for modern living</h3>
                    <p className="mb-6">From comfortable family homes to stylish urban apartments, find your perfect space.</p>
                    <div className="relative w-full h-40 bg-white rounded-lg shadow-lg flex items-center justify-center">
                      <span className="text-modulify-blue">Featured Residential Listings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="commercial" className="mt-8">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <div className="w-full h-96 bg-modulify-dark flex items-center justify-center text-white">
                  <div className="text-center max-w-xl mx-auto p-8">
                    <h3 className="text-3xl font-bold mb-4">Premium Commercial Spaces</h3>
                    <p className="mb-6">Strategically located office spaces, retail locations, and industrial properties.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span>Office Space</span>
                      </div>
                      <div className="h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span>Retail Locations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="luxury" className="mt-8">
            <div className="h-96 bg-gradient-blue flex items-center justify-center text-white rounded-xl">
              <span className="text-xl">Exclusive Luxury Estates & Penthouses</span>
            </div>
          </TabsContent>

          <TabsContent value="international" className="mt-8">
            <div className="h-96 bg-modulify-tan flex items-center justify-center text-modulify-dark rounded-xl">
              <span className="text-xl">Global Properties & Destinations</span>
            </div>
          </TabsContent>

          <TabsContent value="investment" className="mt-8">
            <div className="h-96 bg-gray-800 flex items-center justify-center text-white rounded-xl">
              <span className="text-xl">High-Yield Investment Opportunities</span>
            </div>
          </TabsContent>

          <TabsContent value="vacation" className="mt-8">
            <div className="h-96 bg-white border border-gray-200 flex items-center justify-center text-modulify-dark rounded-xl">
              <span className="text-xl">Vacation Properties & Second Homes</span>
            </div>
          </TabsContent>

          <TabsContent value="new-developments" className="mt-8">
            <div className="h-96 bg-modulify-yellow flex items-center justify-center text-white rounded-xl">
              <span className="text-xl">Pre-Construction & New Development Projects</span>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
