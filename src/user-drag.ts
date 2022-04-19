import { Style } from '@master/style';

export class UserDrag extends Style {
    static id = 'userDrag';
    static override matches = /^user-drag:./;
    override get props(): { [key: string]: any } {
        return {
            'user-drag': this,
            '-webkit-user-drag': this
        }
    };
}