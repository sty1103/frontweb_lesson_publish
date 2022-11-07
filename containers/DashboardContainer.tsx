import Dashboard from "@/components/Dashboard";

interface Props {
  className?: string;
}

export default function DashboardContainer(props: Props) {
  return <Dashboard {...props} />
}