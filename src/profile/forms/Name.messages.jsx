import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'profile.name.full.name': {
    id: 'profile.name.full.name',
    defaultMessage: 'Họ và tên',
    description: 'Một phần trong hồ sơ người dùng',
  },
  'profile.name.empty': {
    id: 'profile.name.empty',
    defaultMessage: 'Thêm họ và tên',
    description: 'Nơi để thêm tên vào hồ sơ người dùng.',
  },
  'profile.name.tooltip': {
    id: 'profile.name.tooltip',
    defaultMessage: 'Tên được sử dụng để xác minh ID và xuất hiện trên chứng chỉ của bạn',
    description: 'Chú giải công cụ cho trường họ và tên.',
  },
  'profile.name.redirect': {
    id: 'profile.name.redirect',
    defaultMessage: 'Chỉnh sửa họ và tên từ trang Tài khoản',
    description: 'Thông báo chuyển hướng để chỉnh sửa tên từ trang Tài khoản.',
  },
});

export default messages;