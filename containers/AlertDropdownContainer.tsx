import AlertDropdown from "@/components/AlertDropdown";

interface Props {
  className?: string;
  active?: boolean;
}

export default function AlertDropdownContainer(props: Props) {
  return (
    <AlertDropdown {...props} />
  );
}