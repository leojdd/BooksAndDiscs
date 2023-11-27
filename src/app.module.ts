import { AppConfigurationService } from './infrastructure/configuration/app-configuration.service';
import { AppConfigurationModule } from './infrastructure/configuration/app-configuration.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { ItemModule } from './item/item.module';
import { AppController } from './app/controllers/app.controller';
import { AppService } from './app/services/app.service';

@Module({
  imports: [
    AppConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: (appConfigService: AppConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          //useNewUrlParser: true,
          //useUnifiedTopology: true,
        };
        return options;
      },
    }),
    RouterModule.register([{
      path: 'item',
      module: ItemModule
    }]),
    ItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}