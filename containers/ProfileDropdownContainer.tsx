import ProfileDropdown from "@/components/ProfileDropdown";

interface Props {
  className?: string;
  active?: boolean;
}

export default function ProfileDropdownContainer(props: Props) {
  return (
    <ProfileDropdown { ...props } />
  )
}