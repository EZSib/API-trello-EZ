import {Controller} from "@nestjs/common";
import {Get} from "@nestjs/common";
import {AppService} from "./app.service";

@Controller('/api')
export class AppController {

    constructor(private appService: AppService) {}

    @Get('/users')
    getUsers() {
            return this.appService.getUsers()
        }

}