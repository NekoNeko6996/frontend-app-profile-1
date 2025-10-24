import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'profile.viewMyRecords': {
    id: 'profile.viewMyRecords',
    defaultMessage: 'Xem hồ sơ của tôi',
    description: 'Một liên kết để xem hồ sơ học tập của tôi',
  },
  'profile.loading': {
    id: 'profile.loading',
    defaultMessage: 'Đang tải hồ sơ...',
    description: 'Thông báo hiển thị khi dữ liệu hồ sơ đang tải.',
  },
  'profile.username': {
    id: 'profile.username',
    defaultMessage: 'Tên người dùng',
    description: 'Nhãn cho trường tên người dùng.',
  },
  'profile.username.tooltip': {
    id: 'profile.username.tooltip',
    defaultMessage: 'Tên nhận dạng bạn trên edX. Bạn không thể thay đổi tên người dùng của mình.',
    description: 'Chú giải công cụ cho trường tên người dùng.',
  },
});

export default messages;