import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from "path";
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      cors: {
        credentials: true,
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: "Content-Type,Accept,Authorization,Access-Control-Allow-Origin"
      },
    }),
    MongooseModule.forRoot(process.env.MONGODB || 'mongodb://localhost:27017/platby', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
    }),
    UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
