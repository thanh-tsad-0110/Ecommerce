/**
 * FILE: screens/OrderHistoryScreen.tsx
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, ORDER_STATUS_LABELS } from '../constants';
import { RootStackParamList, OrderStatus } from '../types';
import { formatPrice, formatDate } from '../utils/formatting';

type OrderHistoryProps = NativeStackScreenProps<RootStackParamList, 'OrderHistory'>;

const OrderHistoryScreen: React.FC<OrderHistoryProps> = ({ navigation }) => {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  // Mock orders
  const orders = [
    {
      id: '1',
      orderNumber: 'ORD-2026-001',
      date: '2026-01-20',
      status: 'delivered' as OrderStatus,
      total: 29990000,
      items: 2,
    },
    {
      id: '2',
      orderNumber: 'ORD-2026-002',
      date: '2026-01-18',
      status: 'shipped' as OrderStatus,
      total: 15500000,
      items: 1,
    },
    {
      id: '3',
      orderNumber: 'ORD-2026-003',
      date: '2026-01-15',
      status: 'processing' as OrderStatus,
      total: 8990000,
      items: 3,
    },
    {
      id: '4',
      orderNumber: 'ORD-2026-004',
      date: '2026-01-10',
      status: 'pending' as OrderStatus,
      total: 12000000,
      items: 1,
    },
  ].filter((order) => filterStatus === 'all' || order.status === filterStatus);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return COLORS.success;
      case 'shipped':
        return COLORS.info;
      case 'processing':
        return COLORS.warning;
      case 'pending':
        return COLORS.error;
      default:
        return COLORS.textLight;
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return '✓';
      case 'shipped':
        return '🚚';
      case 'processing':
        return '⚙️';
      case 'pending':
        return '⏳';
      default:
        return '?';
    }
  };

  const renderOrderItem = ({ item }: { item: typeof orders[0] }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
    >
      {/* Header */}
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + '20' },
          ]}
        >
          <Text style={{ color: getStatusColor(item.status) }}>
            {getStatusIcon(item.status)} {ORDER_STATUS_LABELS[item.status]}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.orderDetails}>
        <Text style={styles.detailText}>
          {item.items} sản phẩm • {formatPrice(item.total)}
        </Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* FILTER BUTTONS */}
        <View style={styles.filterContainer}>
          {(['all', 'pending', 'processing', 'shipped', 'delivered'] as const).map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                filterStatus === status && styles.filterButtonActive,
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={[
                  styles.filterText,
                  filterStatus === status && styles.filterTextActive,
                ]}
              >
                {status === 'all' ? 'Tất cả' : ORDER_STATUS_LABELS[status]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ORDERS LIST */}
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>Không có đơn hàng</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  filterTextActive: {
    color: COLORS.textInverse,
    fontWeight: FONT_WEIGHTS.semibold as any,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  orderCard: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  orderNumber: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  orderDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  arrow: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
  },
});

export default OrderHistoryScreen;
