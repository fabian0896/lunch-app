import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-male-sprites';

async function generateAvatar(id) {
  const svg = createAvatar(style, {
    seed: id,
    dataUri: true,
    backgroundColor: '#FFFFFF',
    margin: 5,
    mood: ['happy'],
  });
  const res = await fetch(svg);
  const blob = await res.blob();
  const file = new File([blob], 'avatar.svg');
  console.log(file);
  return svg;
}

export default generateAvatar;
