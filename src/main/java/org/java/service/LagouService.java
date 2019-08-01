package org.java.service;

import java.util.List;
import java.util.Map;

/**
 * @Author 秒度
 * @Date 2019/7/20 0020 18:32
 */

public interface LagouService {
    List<Map<String, Object>> findAll(Map<String, Object> map);

    void delById(int id);

    void add(Map<String, Object> map);

    int findCount();

    List<Map<String, Object>> findPie();
}
