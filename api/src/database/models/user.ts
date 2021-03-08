import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid} from 'uuid';

@Entity('users')
class userModel {
    
    @PrimaryColumn()
    readonly id: string;
    
    @Column()
    name: string;
    
    @Column()
    mail: string;
    
    @CreateDateColumn()
    createdAt: Date; 

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { userModel }