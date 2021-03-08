import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid} from 'uuid';
import { surveyModel } from './survey';
import { userModel } from './user';

@Entity('surveys_users')
class surveysUserModel {
    
    @PrimaryColumn()
    readonly id: string;
    
    @Column()
    user_id: string;

    @ManyToOne(() => userModel)
    @JoinColumn({name: 'user_id'})
    user: userModel;
    
    @Column()
    survey_id: string;

    @ManyToOne(() => surveyModel)
    @JoinColumn({name: 'survey_id'})
    survey: surveyModel;
    
    @Column()
    value: number;
    
    @CreateDateColumn()
    createdAt: Date; 

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}


export { surveysUserModel }