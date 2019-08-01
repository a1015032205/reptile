package org.java.service.Impl;

import org.java.dao.LagouMapper;
import org.java.service.LagouService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @Author 秒度
 * @Date 2019/7/20 0020 18:33
 */
@Service
public class LagouServiceImpl implements LagouService {
    @Autowired
    private LagouMapper lagouMapper;

    @Override
    @Async
    public List<Map<String, Object>> findAll(Map<String, Object> map) {
        return lagouMapper.findAll(map);
    }

    @Transactional
    @Override
    public void delById(int id) {
        lagouMapper.delById(id);
    }

    @Transactional
    @Override
    @Async
    public void add(Map<String, Object> map) {
        lagouMapper.add(map);
    }

    @Override
    @Async
    public int findCount() {
        return lagouMapper.findCount();
    }

    @Override
    @Async
    public List<Map<String, Object>> findPie() {
        return lagouMapper.findPie();
    }
}
