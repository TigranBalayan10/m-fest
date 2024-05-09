import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DataCardProps {
  title: string;
  description: string;
  content: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, description, content }) => {
  return (
    <Card className="bg-slate-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">{content}</div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
