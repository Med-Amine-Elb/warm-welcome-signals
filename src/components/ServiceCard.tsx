import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

const ServiceCard = ({ icon, title, description, index = 0 }: ServiceCardProps) => {
  return (
    <Card 
      className="glass-card overflow-hidden border-border/50 h-full transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
      data-scroll="zoom-in"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-40" />
      
      <CardHeader className="relative z-10 flex items-center space-x-4 pb-2">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-black/10 flex items-center justify-center text-black transition-transform duration-300 group-hover:rotate-12 group-hover:animate-pulse">
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
