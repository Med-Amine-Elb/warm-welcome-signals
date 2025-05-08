
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

const ServiceCard = ({ icon, title, description, index = 0 }: ServiceCardProps) => {
  return (
    <Card className="glass-card overflow-hidden hover-scale border-border/50 h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-40" />
      
      <CardHeader className="relative z-10 flex items-center space-x-4 pb-2">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <CardTitle className="text-2xl font-medium">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-4">
        <p className="text-lg text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
