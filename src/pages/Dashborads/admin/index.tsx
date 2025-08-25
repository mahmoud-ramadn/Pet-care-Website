import { DogIcon, DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react"
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useAllPets } from "@/hooks/pet"
import { useAllOrderUsers, useAllUsers } from "@/hooks/user"

// -------------------- Types --------------------
type PerformanceDatum = {
  name: string
  users: number
  revenue: number
}

type RadialDatum = {
  month: string
  desktop: number
  mobile: number
  visitor?: number
}

type CardProps = {
  children: React.ReactNode
  className?: string
}

type StatsCardProps = {
  title: string
  value: string | number
  change: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  iconColor: string
  trend: "up" | "down"
}

// -------------------- Sample data --------------------
const performanceData: PerformanceDatum[] = [
  { name: "Jan", users: 400, revenue: 2400 },
  { name: "Feb", users: 300, revenue: 1398 },
  { name: "Mar", users: 5000, revenue: 9800 },
  { name: "Apr", users: 278, revenue: 3908 },
  { name: "May", users: 189, revenue: 4800 },
  { name: "Jun", users: 239, revenue: 3800 },
  { name: "Jul", users: 350, revenue: 4300 },
  { name: "Aug", users: 420, revenue: 5200 },
  { name: "Sep", users: 310, revenue: 4100 },
  { name: "Oct", users: 500, revenue: 6100 },
  { name: "Nov", users: 450, revenue: 5600 },
  { name: "Dec", users: 1000, revenue: 10000 },
]

// -------------------- UI Components --------------------
const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl ${className}`}
  >
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }: CardProps) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
)

const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`md:px-6 px-3 pb-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: CardProps) => (
  <h3 className={`text-sm font-semibold text-gray-600 uppercase tracking-wide ${className}`}>{children}</h3>
)

// -------------------- Stats Card --------------------
const StatsCard = ({ title, value, change, icon: Icon, iconColor, trend }: StatsCardProps) => (
  <Card className="hover:scale-105 transition-transform duration-200">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle>{title}</CardTitle>
      <div className={`p-2 rounded-full ${iconColor} bg-opacity-10`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="flex items-center text-sm">
        <span className={`${trend === "up" ? "text-green-600" : "text-red-600"} font-medium`}>{change}</span>
        <span className="text-gray-500 ml-1">vs last period</span>
      </div>
    </CardContent>
  </Card>
)

// -------------------- Line Chart --------------------
const PerformanceChart: React.FC = () => (
  <Card>
    <CardHeader>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Performance Overview</h2>
      <p className="text-gray-600 text-sm">Track your key metrics over time</p>
    </CardHeader>
    <CardContent>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%" >
          <LineChart data={performanceData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              name="Users"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              name="Revenue ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
)

// -------------------- Radial Chart --------------------
const VisitorsChart: React.FC<{ data: RadialDatum[] }> = ({ data }) => {
  const totalVisitors =
    (data[0]?.desktop ?? 0) + (data[0]?.mobile ?? 0) + (typeof data[0]?.visitor === "number" ? data[0].visitor : 0)

  return (
    <Card>
      <CardHeader className="text-center">
        <h3 className="text-lg font-bold text-gray-900">Visitors Breakdown</h3>
        <p className="text-gray-600 text-sm">Desktop vs Mobile traffic</p>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart data={data} startAngle={90} endAngle={-270} innerRadius={60} outerRadius={120}>
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 10} className="text-2xl font-bold fill-gray-900">
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 15} className="text-sm fill-gray-600">
                            Total Visitors
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="desktop"
                stackId="a"
                cornerRadius={10}
                fill="#3b82f6"
                className="stroke-white stroke-2"
              />
              <RadialBar
                dataKey="mobile"
                stackId="a"
                cornerRadius={10}
                fill="#10b981"
                className="stroke-white stroke-2"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <div className="flex justify-center items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Desktop: {data[0].desktop.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Mobile: {data[0].mobile.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 mt-3 text-sm text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span className="font-medium">+5.2% this month</span>
        </div>
      </div>
    </Card>
  )
}

export default function AdminDashboard() {
  const { value: users } = useAllUsers()
  const { value: orders } = useAllOrderUsers()
  const { value: pets } = useAllPets()

  const radialData: RadialDatum[] = [{ month: "January", desktop: 1260, mobile: 570, visitor: users?.length }]

  const statsData: StatsCardProps[] = [
    {
      title: "Total Users",
      value: users?.length ?? "",
      change: "+12%",
      icon: Users,
      iconColor: "text-blue-500",
      trend: "up",
    },
    {
      title: "Orders",
      value: orders?.length ?? "",
      change: "+8%",
      icon: ShoppingCart,
      iconColor: "text-green-500",
      trend: "up",
    },
    {
      title: "Revenue",
      value: "$12,450",
      change: "+5%",
      icon: DollarSign,
      iconColor: "text-yellow-500",
      trend: "up",
    },
    {
      title: "Active Sessions",
      value: pets?.length ?? "",
      change: "+2",
      icon: DogIcon,
      iconColor: "text-red-500",
      trend: "up",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Monitor your business performance at a glance</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <PerformanceChart />
          </div>
          <div className="xl:col-span-1">
            <VisitorsChart data={radialData} />
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-12">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
