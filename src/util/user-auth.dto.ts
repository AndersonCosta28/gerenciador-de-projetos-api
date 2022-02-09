import { ApiProperty } from "@nestjs/swagger";

export class UserAuthDto {
    @ApiProperty({example: "admin"})
    username: string;
    @ApiProperty({example: "1234"})
    password: string;
}