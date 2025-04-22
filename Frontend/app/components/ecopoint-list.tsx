import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Ecopoint {
  id: number;
  name: string;
  address: string;
  materials: string[];
}

interface EcopointListProps {
  ecopoints: Ecopoint[];
}

export default function EcopointList({ ecopoints }: EcopointListProps) {
  return (
    <div className="grid gap-4 mt-4">
      {ecopoints.map((ecopoint) => (
        <Card key={ecopoint.id}>
          <CardHeader>
            <CardTitle>{ecopoint.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{ecopoint.address}</p>
            <p className="mt-2">
              <strong>Materiais aceitos:</strong> {ecopoint.materials.join(', ')}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

