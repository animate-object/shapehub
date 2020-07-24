import { Shape } from './lib/shape'
import React from 'react';
import { ShapeView } from './Shape'


// examples: interfaces, generics, function types
interface Props {
    shapes: Shape[]
    favorites: Set<number>
    onSelectShape: (id: number) => void
}

export const ShapeList: React.FC<Props> = ({shapes, favorites, onSelectShape}: Props) => 
    <div>
        {shapes.map((shape, idx) => 
            <div key={idx}>
                <ShapeView
                    favorited={favorites.has(shape.id)}
                    shape={shape}
                    onSelectShape={onSelectShape}
                />
            </div>
        )}
    </div>