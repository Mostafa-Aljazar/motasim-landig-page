import { FOOTER_FOLLOW_US } from '@/content/common/footer';
import { Box, Group, Stack, Text } from '@mantine/core';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer_ContactInfo({
  className,
}: {
  className?: string;
}) {
  return (
    <Box className={className}>
      <Stack gap={20} mb={16}>
        <Group gap={8}>
          <Phone size={18} className='!text-primary' />
          <Text c='dark' fz={16} fw={500} dir='ltr'>
            +972 59-579-6456
          </Text>
        </Group>
        <Group gap={8}>
          <Mail size={18} className='!text-primary' />
          <Text c='dark' fz={16} fw={500} dir='ltr'>
            AlaqsaCamp@gmail.com
          </Text>
        </Group>
        <Group gap={8}>
          <MapPin size={18} className='!text-primary' />
          <Text c='dark' fz={16} fw={500} dir='ltr'>
            Gaza, Palestine
          </Text>
        </Group>
      </Stack>
      <Box mb={16}>
        <Text mb={8} fz={16} fw={500} className='!text-primary'>
          {FOOTER_FOLLOW_US}
        </Text>
        <Group gap={20}>
          <Link href='#'>
            <Instagram size={22} className='!text-primary' />
          </Link>
          <Link href='#'>
            <Linkedin size={22} className='!text-primary' />
          </Link>
          <Link href='#'>
            <Facebook size={22} className='!text-primary' />
          </Link>
          <Link href='#'>
            <X size={22} className='!text-primary' />
          </Link>
        </Group>
      </Box>
    </Box>
  );
}
