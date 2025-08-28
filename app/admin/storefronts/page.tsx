"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Search, MapPin, User, Calendar, Edit, Trash, MoreHorizontal, Navigation } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OranjButton } from "@/components/ui/oranj-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import Image from "next/image"

// Sample storefront data with coordinates
const storefronts = [
  {
    id: "1",
    name: "Main Store",
    address: "123 Lagos Street, Lagos, Nigeria",
    manager: "Sarah Johnson",
    employees: 5,
    status: "Active",
    createdAt: "Jan 15, 2023",
    coordinates: [3.3792, 6.5244], // Lagos coordinates
    logo: "/shoprite-logo.png",
  },
  {
    id: "2",
    name: "Branch Store",
    address: "456 Abuja Road, Abuja, Nigeria",
    manager: "Michael Chen",
    employees: 3,
    status: "Active",
    createdAt: "Mar 10, 2023",
    coordinates: [7.4951, 9.0579], // Abuja coordinates
    logo: "/shoprite-logo.png",
  },
  {
    id: "3",
    name: "Mall Kiosk",
    address: "Ikeja City Mall, Lagos, Nigeria",
    manager: "Jessica Williams",
    employees: 2,
    status: "Inactive",
    createdAt: "Apr 5, 2023",
    coordinates: [3.3421, 6.6194], // Ikeja coordinates
    logo: "/shoprite-logo.png",
  },
  {
    id: "4",
    name: "Victoria Island Branch",
    address: "Victoria Island, Lagos, Nigeria",
    manager: "David Okafor",
    employees: 4,
    status: "Active",
    createdAt: "May 20, 2023",
    coordinates: [3.4219, 6.4281], // VI coordinates
    logo: "/shoprite-logo.png",
  },
  {
    id: "5",
    name: "Lekki Store",
    address: "Lekki Phase 1, Lagos, Nigeria",
    manager: "Amina Hassan",
    employees: 3,
    status: "Active",
    createdAt: "Jun 10, 2023",
    coordinates: [3.47, 6.4474], // Lekki coordinates
    logo: "/shoprite-logo.png",
  },
]

export default function StorefrontsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { user } = useAuth()
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const tabs = [
    { id: "all", label: "All Storefronts" },
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
  ]

  const filteredStorefronts =
    activeTab === "all" ? storefronts : storefronts.filter((store) => store.status.toLowerCase() === activeTab)

  // Initialize map
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmFyYW5nYXltbyIsImEiOiJjbWJxZHBzenAwMmdrMmtzZmloemphb284In0.U22j37ppYT1IMyC2lXVBzw"

    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [3.3792, 6.5244], // Center on Lagos
        zoom: 8,
      })

      map.current.on("load", () => {
        setMapLoaded(true)

        // Add source for clustering
        map.current!.addSource("storefronts", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: filteredStorefronts.map((store) => ({
              type: "Feature",
              properties: {
                id: store.id,
                name: store.name,
                address: store.address,
                status: store.status,
                logo: store.logo,
              },
              geometry: {
                type: "Point",
                coordinates: store.coordinates,
              },
            })),
          },
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        })

        // Add cluster circles
        map.current!.addLayer({
          id: "clusters",
          type: "circle",
          source: "storefronts",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#8B5CF6", // Purple for small clusters
              5,
              "#7C3AED", // Darker purple for medium clusters
              10,
              "#6D28D9", // Even darker for large clusters
            ],
            "circle-radius": ["step", ["get", "point_count"], 20, 5, 30, 10, 40],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        })

        // Add cluster count labels
        map.current!.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "storefronts",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          paint: {
            "text-color": "#ffffff",
          },
        })

        // Add individual store points
        map.current!.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "storefronts",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": [
              "case",
              ["==", ["get", "status"], "Active"],
              "#8B5CF6", // Purple for active
              "#9CA3AF", // Gray for inactive
            ],
            "circle-radius": 8,
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff",
          },
        })

        // Add store logos as symbols
        map.current!.loadImage("/shoprite-logo.png", (error, image) => {
          if (error) throw error
          if (image) {
            map.current!.addImage("store-logo", image)
            map.current!.addLayer({
              id: "store-logos",
              type: "symbol",
              source: "storefronts",
              filter: ["!", ["has", "point_count"]],
              layout: {
                "icon-image": "store-logo",
                "icon-size": 0.15,
                "icon-allow-overlap": true,
              },
            })
          }
        })

        // Click event for clusters
        map.current!.on("click", "clusters", (e) => {
          const features = map.current!.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          })
          const clusterId = features[0].properties!.cluster_id
          ;(map.current!.getSource("storefronts") as mapboxgl.GeoJSONSource).getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
              if (err) return

              map.current!.easeTo({
                center: (features[0].geometry as any).coordinates,
                zoom: zoom,
              })
            },
          )
        })

        // Hover effects and popups for individual stores
        map.current!.on("mouseenter", "unclustered-point", (e) => {
          map.current!.getCanvas().style.cursor = "pointer"

          const coordinates = (e.features![0].geometry as any).coordinates.slice()
          const { name, address, status } = e.features![0].properties!

          // Create custom popup with store logo and dashboard font
          const popup = new mapboxgl.Popup({
            offset: 25,
            className: "store-popup",
          }).setHTML(`
              <div style="padding: 12px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <img src="/shoprite-logo.png" alt="Store Logo" style="width: 24px; height: 24px; margin-right: 8px; border-radius: 4px;" />
                  <h3 style="font-weight: 600; margin: 0; font-size: 14px; color: #1f2937;">${name}</h3>
                </div>
                <p style="margin: 4px 0; font-size: 12px; color: #6b7280; line-height: 1.4;">${address}</p>
                <div style="margin-top: 8px;">
                  <span style="
                    display: inline-block;
                    padding: 2px 8px;
                    font-size: 11px;
                    font-weight: 500;
                    border-radius: 12px;
                    ${
                      status === "Active"
                        ? "background-color: #dcfce7; color: #166534;"
                        : "background-color: #fee2e2; color: #dc2626;"
                    }
                  ">${status}</span>
                </div>
              </div>
            `)

          popup.setLngLat(coordinates).addTo(map.current!)
        })

        map.current!.on("mouseleave", "unclustered-point", () => {
          map.current!.getCanvas().style.cursor = ""
          const popups = document.getElementsByClassName("mapboxgl-popup")
          if (popups.length) {
            popups[0].remove()
          }
        })

        // Change cursor on cluster hover
        map.current!.on("mouseenter", "clusters", () => {
          map.current!.getCanvas().style.cursor = "pointer"
        })
        map.current!.on("mouseleave", "clusters", () => {
          map.current!.getCanvas().style.cursor = ""
        })
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [filteredStorefronts])

  return (
    <div className="flex flex-col w-full">
      <AdminHeader title="Storefronts" description={`Manage your POS locations, ${user?.name || "User"}`} />

      <div className="relative w-full">
        {/* Map Container */}
        <div ref={mapContainer} className="w-full h-[350px] relative z-0" />

        {/* Gradient Overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10"
          aria-hidden="true"
        />

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <OranjButton
            size="sm"
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm shadow-sm"
            onClick={() => map.current?.flyTo({ center: [3.3792, 6.5244], zoom: 8 })}
          >
            <Navigation className="h-4 w-4 mr-1" />
            Center
          </OranjButton>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="w-full sm:w-auto">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex-1 sm:flex-none">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search storefronts..." className="w-full sm:w-[200px] pl-8" />
            </div>
            <Link href="/admin/storefronts/add" passHref>
              <OranjButton className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Storefront
              </OranjButton>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStorefronts.map((store) => (
            <Card
              key={store.id}
              className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={store.logo || "/placeholder.svg"}
                        alt={`${store.name} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {store.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <OranjButton variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </OranjButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="shadow-md">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{store.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{store.manager}</p>
                      <p className="text-xs text-muted-foreground">{store.employees} employees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">Created on {store.createdAt}</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        store.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {store.status}
                    </span>
                    <Link href={`/admin/storefronts/${store.id}`} passHref>
                      <OranjButton size="sm">Manage</OranjButton>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
