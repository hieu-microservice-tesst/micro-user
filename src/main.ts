import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';
import {AppModule} from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://dtqrsesy:bT2AyYaZpfFNd-qcnGeY2B_QWLwCOQbD@vulture.rmq.cloudamqp.com/dtqrsesy'],
      queue: 'user_queue',
      // noAck: true ,
      queueOptions: { durable: true },
    },
  });

  app.startAllMicroservices().catch(error => console.error('Microservice error:', error));
  await app.listen(3001);
}

bootstrap();
