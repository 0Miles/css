import { CONTENT, DASH, JUSTIFY } from './constants/css-property-keyword';
import { Style } from '@master/style';

export class JustifyContent extends Style {
    static override key = JUSTIFY + DASH + CONTENT;

}