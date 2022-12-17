import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('shoud be able to read a notification', async () => {
    const notificationsRepsository = new InMemoryNotificationsRepository();
    const cancelNotification = new ReadNotification(notificationsRepsository);

    const notification = makeNotification();

    await notificationsRepsository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepsository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepsository = new InMemoryNotificationsRepository();
    const cancelNotification = new ReadNotification(notificationsRepsository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
