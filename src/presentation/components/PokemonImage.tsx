import React, { useEffect, useState } from 'react';
import { Image, type ImageStyle } from 'react-native';
import { onlineManager } from '@tanstack/react-query';

interface PokemonImageProps {
  imageUrl?: string;
  style: ImageStyle;
}

export function PokemonImage({ imageUrl, style }: PokemonImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    return onlineManager.subscribe(() => {
      if (onlineManager.isOnline()) {
        setHasError(false);
      }
    });
  }, []);

  const placeholder = require('../../assets/images/pokemon-placeholder.png');

  return (
    <Image
      source={hasError || !imageUrl ? placeholder : { uri: imageUrl }}
      style={style}
      resizeMode="contain"
      onError={() => setHasError(true)}
    />
  );
}
