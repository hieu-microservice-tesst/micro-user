import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@127.0.0.1:15672'],
      queue: 'user_queue',
      queueOptions: { durable: false },
    },
  });

  app.startAllMicroservices().catch(error => console.error('Microservice error:', error));
  await app.listen(3001);
}

bootstrap();
